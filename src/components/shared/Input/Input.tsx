import type { Component, JSX } from 'solid-js'
import { createEffect, splitProps } from 'solid-js'
import './style.css'

type Props = {
    class?: string
} & JSX.HTMLElementTags['input']

const Input: Component<Props> = (props) => {
    const [, rest] = splitProps(props, ['class'])
    let input: HTMLInputElement | undefined
    createEffect(async () => {
        if (input!.getAttribute('type') === 'number') {
            input!.setAttribute('onkeydown', 'return false')
        }
    })
    return (
        <input
            ref={input}
            class={`input ${props.class ?? ''}`.trim()}
            {...rest}
        />
    )
}

export default Input
