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

export interface UseZodFormOptions<Schema, TFormValues extends FieldValues> {
  schema: Schema;
  defaultValues: DefaultValues<TFormValues>;
  /**
   * @param value 현재 변경된 값
   * @param formPath 변경된 값의 경로
   * @param setValue 값을 변경하는 함수
   */
  onFormValueChange?: (
    value: DeepPartial<TFormValues>,
    formPath: Path<TFormValues>,
    setValue: UseFormSetValue<TFormValues>
  ) => void;
  onFormSubmit: (data: TFormValues) => void;
}

export type UseZodFormReturn<TFormValues extends FieldValues> = Omit<
  UseFormReturn<TFormValues>,
  /**
   * @description
   *
   * 1. watch, setValue
   * watch, setValue 은 해당 hook 에서만 사용하도록 하기 위해 Return Value 에서 제외
   * 외부에서 watch, setValue 로 값을 변경하는 패턴을 막기 위함
   *
   * 외부에서 watch, setValue 사용을 허용할 경우,
   * Form Data 변경 사항 추적이 어려워짐
   * 해당 form 을 사용하는 어느 곳에서나 값을 변경할 수 있기 때문
   *
   * 2. register
   * register 도 외부에서 사용하는 것을 막기 위해 Return Value 에서 제외
   * Controller 를 사용하여 값을 변경하는 것을 강제하기 위함
   *
   * 3. handleSubmit
   * handleSubmit 은 외부에서 사용하는 것을 막기 위해 Return Value 에서 제외
   * 이를 외부로 노출할 경우, 다양한 패턴이 생성될 수 있음
   * 이를 막기 위해 Return Value 에서 제외
   */
  "watch" | "setValue" | "handleSubmit" | "register"
> & {
  onSubmit: ReturnType<UseFormHandleSubmit<TFormValues>>;
};

/**
 * @description useZodForm
 *
 * useForm 을 사용 방식을 하나로 통일하기 위한 커스텀 Hook
 *
 * 호출 시점에 Form 관련 로직을 선언하도록 강제하여 colocation 규칙을 지키도록 함
 * return value 는 UseZodFormReturn description 참고
 */
export const useZodForm = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  /**
   * @see https://react-hook-form.com/docs/useform/watch
   * watch 로 인한 React rerender 최적화 기법
   */
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
