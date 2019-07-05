declare interface JAPIComponent<C extends React.Component, P> {
  create(containerId: string, options?: P): C
  destroy(containerId: string): void
  getInstance(containerId: string): C
}

declare interface JFormCmp extends React.Component<JFormProps, {}> {}

declare interface JFormProps {
  idPrefix: string
  formDescriptor: JFormDescriptor,
  buttonLabelSubmit?: string
  buttonLabelCancel?: string
  buttonLabelClear?: string
  hideClearButton?: boolean
  onSubmit: (values: any) => void,
  onCancel?: () => void
  onClear?: () => void
}
