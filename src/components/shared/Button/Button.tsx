import type { Component, JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import './style.css'

type Props = {
    title: string
    class?: string
} & JSX.HTMLElementTags['button']

const Button: Component<Props> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    return (
        <button
            class={`button ${props.class ?? ''}`.trim()}
            {...rest}
        >
            {props.title}
        </button>
    )
}

export default Button
