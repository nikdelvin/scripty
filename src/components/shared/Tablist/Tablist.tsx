import type { Component, JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import './style.css'

type Props = {
    class?: string
    list: Array<{
        label?: string
        active?: boolean
        onClick?: () => void
        child?: JSX.Element
    }>
} & JSX.HTMLElementTags['ul']

const Tablist: Component<Props> = (props) => {
    const [, rest] = splitProps(props, ['list', 'class'])
    return (
        <ul
            class={`tab-list tabbed-sidebar ${props.class ?? ''}`.trim()}
            {...rest}
        >
            {props.list.map((el) => (
                <li class="tab-item flex flex-row">
                    {el.label != null && (
                        <a
                            onClick={el.onClick}
                            class="tab-link w-full"
                            {...(el.active && { 'aria-selected': 'true' })}
                        >
                            {el.label}
                        </a>
                    )}
                    {el.child}
                </li>
            ))}
        </ul>
    )
}

export default Tablist
