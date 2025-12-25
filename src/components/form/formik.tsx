"use client"

import * as React from "react"
import {
    Form,
    Formik,
    useField,
    useFormikContext,
    type FieldHelperProps,
    type FieldInputProps,
    type FieldMetaProps,
    type FormikConfig,
    type FormikProps,
} from "formik"

import { cn } from "@/lib/utils"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "../ui/spinner"
import { Button } from "../ui/button"

type Orientation = "vertical" | "horizontal" | "responsive"

type BaseFieldProps = {
    name: string
    id?: string
    label?: React.ReactNode
    description?: React.ReactNode
    required?: boolean
    orientation?: Orientation
    className?: string
    labelClassName?: string
    contentClassName?: string
    descriptionClassName?: string
    errorClassName?: string
}

type FieldRenderProps<Value> = {
    id: string
    invalid: boolean
    field: FieldInputProps<Value>
    meta: FieldMetaProps<Value>
    helpers: FieldHelperProps<Value>
}

type FormikFormProps<Values> = FormikConfig<Values> & {
    className?: string
    children:
    | React.ReactNode
    | ((props: FormikProps<Values>) => React.ReactNode)
}

function FormikForm<Values>({
    className,
    children,
    ...props
}: FormikFormProps<Values>) {
    return (
        <Formik {...props}>
            {(formik) => (
                <Form className={cn("flex flex-col gap-5", className)} noValidate>
                    {typeof children === "function" ? children(formik) : children}
                    {formik.status && <FieldError >{formik.status}</FieldError>}
                </Form>
            )}
        </Formik>
    )
}

function FormikField<Value>({
    name,
    id,
    label,
    description,
    required,
    orientation = "vertical",
    className,
    labelClassName,
    contentClassName,
    descriptionClassName,
    errorClassName,
    children,
}: BaseFieldProps & {
    children: (props: FieldRenderProps<Value>) => React.ReactNode
}) {
    const [field, meta, helpers] = useField<Value>(name)
    const fieldId = id ?? name
    const invalid = Boolean(meta.touched && meta.error)

    return (
        <Field
            data-invalid={invalid}
            data-name={name}
            orientation={orientation}
            className={className}
        >
            {label ? (
                <FieldLabel htmlFor={fieldId} className={labelClassName}>
                    {label}
                    {required ? (
                        <span className="text-destructive" aria-hidden="true">
                            *
                        </span>
                    ) : null}
                </FieldLabel>
            ) : null}
            <FieldContent className={contentClassName}>
                {children({ field, meta, helpers, id: fieldId, invalid })}
                {description ? (
                    <FieldDescription className={descriptionClassName}>
                        {description}
                    </FieldDescription>
                ) : null}
                <FieldError className={errorClassName}>
                    {invalid ? String(meta.error) : null}
                </FieldError>
            </FieldContent>
        </Field>
    )
}

type FormikInputProps = BaseFieldProps &
    Omit<
        React.ComponentProps<typeof Input>,
        "name" | "value" | "onChange" | "onBlur" | "id"
    >

function FormikInput({
    name,
    id,
    label,
    description,
    required,
    orientation,
    className,
    labelClassName,
    contentClassName,
    descriptionClassName,
    errorClassName,
    ...props
}: FormikInputProps) {
    const { isSubmitting } = useFormikContext()
    return (
        <FormikField
            name={name}
            id={id}
            label={label}
            description={description}
            required={required}
            orientation={orientation}
            className={className}
            labelClassName={labelClassName}
            contentClassName={contentClassName}
            descriptionClassName={descriptionClassName}
            errorClassName={errorClassName}
        >
            {({ field, id: fieldId, invalid }) => (
                <Input
                    className={cn('flex w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 h-12 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all',
                        className
                    )}
                    {...props}
                    {...field}
                    id={fieldId}
                    aria-invalid={invalid}
                    disabled={isSubmitting}
                />
            )}
        </FormikField>
    )
}

type FormikTextareaProps = BaseFieldProps &
    Omit<
        React.ComponentProps<typeof Textarea>,
        "name" | "value" | "onChange" | "onBlur" | "id"
    >

function FormikTextarea({
    name,
    id,
    label,
    description,
    required,
    orientation,
    className,
    labelClassName,
    contentClassName,
    descriptionClassName,
    errorClassName,
    ...props
}: FormikTextareaProps) {
    return (
        <FormikField
            name={name}
            id={id}
            label={label}
            description={description}
            required={required}
            orientation={orientation}
            className={className}
            labelClassName={labelClassName}
            contentClassName={contentClassName}
            descriptionClassName={descriptionClassName}
            errorClassName={errorClassName}
        >
            {({ field, id: fieldId, invalid }) => (
                <Textarea
                    {...props}
                    {...field}
                    id={fieldId}
                    aria-invalid={invalid}
                />
            )}
        </FormikField>
    )
}

type FormikSelectProps = BaseFieldProps & {
    placeholder?: string
    triggerClassName?: string
    children: React.ReactNode
}

function FormikSelect({
    name,
    id,
    label,
    description,
    required,
    orientation,
    className,
    labelClassName,
    contentClassName,
    descriptionClassName,
    errorClassName,
    placeholder,
    triggerClassName,
    children,
}: FormikSelectProps) {
    return (
        <FormikField
            name={name}
            id={id}
            label={label}
            description={description}
            required={required}
            orientation={orientation}
            className={className}
            labelClassName={labelClassName}
            contentClassName={contentClassName}
            descriptionClassName={descriptionClassName}
            errorClassName={errorClassName}
        >
            {({ field, helpers, id: fieldId, invalid }) => (
                <Select
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                        helpers.setValue(value)
                        helpers.setTouched(true, false)
                    }}
                >
                    <SelectTrigger
                        id={fieldId}
                        aria-invalid={invalid}
                        onBlur={() => helpers.setTouched(true, false)}
                        className={triggerClassName}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>{children}</SelectContent>
                </Select>
            )}
        </FormikField>
    )
}

type FormikCheckboxProps = BaseFieldProps &
    Omit<
        React.ComponentProps<typeof Checkbox>,
        "checked" | "onCheckedChange" | "id" | "name"
    >

function FormikCheckbox({
    name,
    id,
    label,
    description,
    required,
    orientation = "horizontal",
    className,
    labelClassName,
    contentClassName,
    descriptionClassName,
    errorClassName,
    ...props
}: FormikCheckboxProps) {
    const [field, meta, helpers] = useField<boolean>(name)
    const fieldId = id ?? name
    const invalid = Boolean(meta.touched && meta.error)

    return (
        <Field
            data-invalid={invalid}
            data-name={name}
            orientation={orientation}
            className={className}
        >
            <Checkbox
                {...props}
                id={fieldId}
                aria-invalid={invalid}
                checked={Boolean(field.value)}
                onCheckedChange={(value) => {
                    helpers.setValue(value === true)
                    helpers.setTouched(true, false)
                }}
            />
            <FieldContent className={cn("gap-1", contentClassName)}>
                {label ? (
                    <FieldLabel htmlFor={fieldId} className={labelClassName}>
                        {label}
                        {required ? (
                            <span className="text-destructive" aria-hidden="true">
                                *
                            </span>
                        ) : null}
                    </FieldLabel>
                ) : null}
                {description ? (
                    <FieldDescription className={descriptionClassName}>
                        {description}
                    </FieldDescription>
                ) : null}
                <FieldError className={errorClassName}>
                    {invalid ? String(meta.error) : null}
                </FieldError>
            </FieldContent>
        </Field>
    )
}

type FormikSwitchProps = BaseFieldProps &
    Omit<
        React.ComponentProps<typeof Switch>,
        "checked" | "onCheckedChange" | "id" | "name"
    >

function FormikSwitch({
    name,
    id,
    label,
    description,
    required,
    orientation = "horizontal",
    className,
    labelClassName,
    contentClassName,
    descriptionClassName,
    errorClassName,
    ...props
}: FormikSwitchProps) {
    const [field, meta, helpers] = useField<boolean>(name)
    const fieldId = id ?? name
    const invalid = Boolean(meta.touched && meta.error)

    return (
        <Field
            data-invalid={invalid}
            data-name={name}
            orientation={orientation}
            className={className}
        >
            <Switch
                {...props}
                id={fieldId}
                aria-invalid={invalid}
                checked={Boolean(field.value)}
                onCheckedChange={(value) => {
                    helpers.setValue(Boolean(value))
                    helpers.setTouched(true, false)
                }}
            />
            <FieldContent className={cn("gap-1", contentClassName)}>
                {label ? (
                    <FieldLabel htmlFor={fieldId} className={labelClassName}>
                        {label}
                        {required ? (
                            <span className="text-destructive" aria-hidden="true">
                                *
                            </span>
                        ) : null}
                    </FieldLabel>
                ) : null}
                {description ? (
                    <FieldDescription className={descriptionClassName}>
                        {description}
                    </FieldDescription>
                ) : null}
                <FieldError className={errorClassName}>
                    {invalid ? String(meta.error) : null}
                </FieldError>
            </FieldContent>
        </Field>
    )
}

type FormikRadioGroupProps = BaseFieldProps & {
    options: Array<{ value: string; label: React.ReactNode }>
    radioClassName?: string
}

function FormikRadioGroup({
    name,
    id,
    label,
    description,
    required,
    orientation,
    className,
    labelClassName,
    contentClassName,
    descriptionClassName,
    errorClassName,
    options,
    radioClassName,
}: FormikRadioGroupProps) {
    return (
        <FormikField
            name={name}
            id={id}
            label={label}
            description={description}
            required={required}
            orientation={orientation}
            className={className}
            labelClassName={labelClassName}
            contentClassName={contentClassName}
            descriptionClassName={descriptionClassName}
            errorClassName={errorClassName}
        >
            {({ field, helpers, invalid }) => (
                <RadioGroup
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                        helpers.setValue(value)
                        helpers.setTouched(true, false)
                    }}
                    name={name}
                    aria-invalid={invalid}
                    className={radioClassName}
                >
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-2 text-sm"
                        >
                            <RadioGroupItem value={option.value} />
                            {option.label}
                        </label>
                    ))}
                </RadioGroup>
            )}
        </FormikField>
    )
}

type FormikSubmitButtonProps = React.ComponentProps<"button"> & {
    disableWhenInvalid?: boolean
    disableWhenSubmitting?: boolean
    children: React.ReactNode
}

function FormikSubmitButton({
    disableWhenInvalid = true,
    disableWhenSubmitting = true,
    className,
    children,
    ...props
}: FormikSubmitButtonProps) {
    const { isSubmitting, isValid } = useFormikContext()
    const disabled =
        (disableWhenSubmitting && isSubmitting) ||
        (disableWhenInvalid && !isValid)

    return (
        <Button
            type="submit"
            className={cn(className, 'flex items-center gap-2 cursor-pointer')}
            disabled={disabled}
            {...props}
        >
            {isSubmitting && <Spinner />}
            <span>{children}</span>
        </Button>
    )
}

export {
    FormikForm,
    FormikField,
    FormikInput,
    FormikTextarea,
    FormikSelect,
    FormikCheckbox,
    FormikSwitch,
    FormikRadioGroup,
    FormikSubmitButton,
    SelectItem,
}
