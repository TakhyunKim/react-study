# Form Control

## 구현 시나리오

1. 유저는 총 두 가지의 Form UI 를 사용할 수 있습니다.
2. 회원가입, 로그인 UI 를 사용합니다.
3. 두 화면에선 개별적인 Validation 로직을 가지고 있습니다.

## 기술 스택

- react
- mui/material
- zod
- react-hook-form

## 리마인드 혹은 배웠던 점

### 코드 응집도의 중요성

현업에서 react-hook-form 을 통해 form 을 다루면서, 아래와 같은 생각을 하게 되었습니다.

> - 동일한 목적의 코드가 다른 형태로 이루어져 있으니 유지 보수가 어렵다.

프로젝트를 유지보수 하면서, 동일한 목적의 코드가 개발자마다 조금 다르게 구현하고 있다는 점을 확인했습니다.<br />
그리고 저조차도 현재 코드와 몇개월 전 코드가 다르다는 점을 확인했습니다.

이는 매우 큰 문제는 아니지만, Form 을 수정할 때마다 다르게 구현된 코드를 파악하는 비용이 작지 않다고 느꼈습니다.<br />
그래서 이번 form-control 에서는 react-hook-form 라이브러리를 다시 래핑해서 제약을 두는 형태로 가져가는 작업을 해보았습니다.

제약을 두어 가져가고자 하는 목적은 다음과 같습니다.

> 1. 일관성 있는 코드(예측 가능한 코드)
> 2. Form 관련 로직의 응집도 높이기

각각의 목적에 대한 생각과 과정을 적어보겠습니다

### 다양한 형태의 코드 예시

앞서 이야기한 것처럼 `동일한 목적의 코드가 개발자마다 조금 다르게 구현하고 있다`고 말했습니다.<br />
동일한 목적의 코드를 다르게 구현하는 예시를 살펴보겠습니다

아이디, 패스워드를 입력하는 로그인 페이지가 있고,<br />
`패스워드를 8자 이상 입력하면 아이디 Input 창에 임시 이메일을 채워넣어준다` 와 같은 요구사항이 있다고 가정하겠습니다.<br />
이런 요구사항은 없겠지만 요는 `특정 Field 값을 수정할 때, 다른 Field 값에 영향을 준다` 입니다.

이를 `react-hook-form` 과 `zod` 를 활용한다면 다음과 같은 예시가 있을 것 같습니다.

#### 1. custom hook 에서 요구사항을 녹여내기

```ts
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TEMPORARY_EMAIL = "test@test.com";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const defaultValues: z.TypeOf<typeof loginInputSchema> = {
  email: "",
  password: "",
};

const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
  });

  const { watch, setValue } = form;
  const password = watch("password");

  useEffect(() => {
    if (password.length > 8) {
      setValue("email", TEMPORARY_EMAIL);
    }
  }, [password, setValue]);

  return form;
};
```

#### 2. 컴포넌트 레벨에서 요구사항을 녹여내기

```ts
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TEMPORARY_EMAIL = "test@test.com";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const defaultValues: z.TypeOf<typeof loginInputSchema> = {
  email: "",
  password: "",
};

const useLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
  });

  return form;
};

const LoginForm = () => {
  const form = useLoginForm();

  const { watch, setValue } = form;
  const password = watch("password");

  useEffect(() => {
    if (password.length > 8) {
      setValue("email", TEMPORARY_EMAIL);
    }
  }, [password, setValue]);

  return (
    // ...jsx
  );
};
```

가장 중요한 골자인 `특정 Field 값을 수정할 때, 다른 Field 값에 영향을 준다` 를 기반으로<br />
다양한 요구사항이 있어 구현하게 된다면, 다양한 형태의 코드가 나올 수 있습니다.<br />
요구사항이 수정되어 코드를 수정하게 될 경우, 요구사항이 custom hook 에 있을지<br />
아니면 hook 을 호출한 컴포넌트에 있을지, 더 나아가 하위 컴포넌트에 있을지 확신할 수 없습니다.<br />
`요구사항 확인을 위해 관련된 코드 전체를 살펴보는 비용이 발생`하게 됩니다.

그리고 이는 곧, `1관련 Form 동작이 흩어져 있다는 뜻`이기도 합니다.<br />
Form 제출 시 어떤 로직이 실행되는지<br />
Form 형태(Schema)가 어떻게 되는지<br />
Form 의 각 Field 별로 어떤 동작을 하는지<br />
는 한 곳에 뭉쳐있으면 Form 관련 요구사항을 빠르게 확인할 수 있다는 장점이 있을 것 같습니다.

### 일관성 + 응집도 있는 코드 만들기

앞서 말씀드린 것과 같이 구현 방식에 제약을 두는 방향으로 해결하고자 했습니다.<br />
바로 코드부터 살펴보곘습니다.

```ts
import { z } from "zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ZodType } from "zod";
import type {
  Path,
  FieldValues,
  DeepPartial,
  DefaultValues,
  UseFormReturn,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

interface UseZodFormOptions<Schema, TFormValues extends FieldValues> {
  schema: Schema;
  defaultValues: DefaultValues<TFormValues>;
  onFormValueChange?: (
    value: DeepPartial<TFormValues>,
    formPath: Path<TFormValues>,
    setValue: UseFormSetValue<TFormValues>
  ) => void;
  onFormSubmit: (data: TFormValues) => void;
}

type UseZodFormReturn<TFormValues extends FieldValues> = Omit<
  UseFormReturn<TFormValues>,
  "watch" | "setValue" | "handleSubmit" | "register"
> & {
  onSubmit: ReturnType<UseFormHandleSubmit<TFormValues>>;
};

export const useZodForm = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends z.infer<Schema>
>({
  schema,
  defaultValues,
  onFormSubmit,
  onFormValueChange,
}: UseZodFormOptions<Schema, TFormValues>): UseZodFormReturn<TFormValues> => {
  const form = useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { watch, setValue, handleSubmit, ...restForm } = form;

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (onFormValueChange) {
        onFormValueChange(value, name as Path<TFormValues>, setValue);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, onFormValueChange]);

  return { ...restForm, onSubmit: handleSubmit(onFormSubmit) };
};


const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginForm = () => {
  const form = useZodForm({
    schema: loginInputSchema,
    defaultValues: {
      email: "",
      password: "",
    },
    onFormValueChange: (_, formPath, setValue) => {
      if (formPath === "password") {
        setValue("email", "test@test.com");
      }
    },
    onFormSubmit: (data) => {
      console.log(data, "submit 했습니다");
    },
  });

  return (
    // ...jsx
  );
};
```

`useZodForm` hook 은 `schema`, `defaultValues`, `onFormSubmit` props 를 필수로 받습니다.<br />
Form 을 다루는데 있어 핵심 로직을 `useZodForm` hook 호출 시점에 작성하도록 제약을 두었습니다.<br />
이를 통해 `응집도를 높이는 결과`를 얻을 수 있다고 생각합니다.

더불어 `useZodForm` 의 return 값에서는 `watch`, `setValue`, `handleSubmit` 를 제외하고 있습니다.<br />
`watch`, `setValue` 를 외부로 노출시킬 경우, 해당 hook 을 사용하는 쪽, 그리고 그 하위 코드에서<br />
위 method 를 활용해서 값을 수정하는 코드를 작성할 수 있기 때문입니다.

그리고 `onFormValueChange` prop 을 통해 `값이 수정될 때에 대한 로직을 선언하도록 유도`했습니다.<br />
기존 `useEffect`, `watch`, `setValue` 를 활용한 로직을 `onFormValueChange` 에 작성하는 방식입니다.<br />
_(위 예시 코드를 보면 더 이해하기 쉬울 것 같네요)_

### 후기

Form 데이터를 다루는 건 굉장히 자주 있는 일입니다.<br />
자주 있지만, 잘 다루는 건 어렵다는 것을 최근에 크게 느끼게 되었습니다.<br />
라이브러리를 통해 다양한 형태의 코드를 구성할 수 있다는 건, 양날의 검이라는 생각도 들었습니다.

다양한 사람이 모여 일을 하게 되고, 다양한 형태의 코드가 생성되며<br />
이는 곧 유지보수에 있어 어려운 과제 중 하나라는 점 또한 느낄 수 있었습니다.

코드 응집도가 얼마나 중요한지, 그리고 일관성 있는 코드, 예측 가능한 코드의 중요도를 느끼고<br />
시작하게된 이번 공부는 나름의 성과가 있다고 생각됩니다.

지속 가능한 형태의 코드를 구성하기 위해 지금과 같은 공부를 계속 이어가볼 예정입니다.

## 레퍼런스

- [react-hook-form docs](https://react-hook-form.com/)
