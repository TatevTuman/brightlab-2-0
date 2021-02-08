import { ComponentType, memo, ComponentProps } from 'react'

type PropsComparator<C extends ComponentType> = (
  prevProps: Readonly<ComponentProps<C>>,
  nextProps: Readonly<ComponentProps<C>>
) => boolean

export default function genericMemo<C extends ComponentType<any>>(Component: C, propsComparator?: PropsComparator<C>) {
  return (memo(Component, propsComparator) as unknown) as C
}
