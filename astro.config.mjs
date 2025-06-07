// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwindcss from '@tailwindcss/vite'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Scripty',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
            sidebar: [
                {
                    label: 'Guides',
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: 'Example Guide', slug: 'guides/example' }
                    ]
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' }
                }
            ],
            customCss: ['./src/styles/global.css']
        }),
        solidJs()
    ],
    vite: {
        plugins: [tailwindcss()]
    },
    devToolbar: {
        enabled: false
    }
})
