declare interface JAPIComponent {
  User: JAPIComponentItem<JUserCmp, JUserCmpProps>
}

declare interface JAPIComponentItem<C extends React.Component, P> {
  create(containerId: string, options?: P): void
  destroy(containerId: string): void
}

declare interface JUserCmp extends React.Component<JUserCmpProps, {}> { }
declare interface JUserCmpProps {
  user?: JUserState
}
