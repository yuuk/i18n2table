// New: App Router ✨
// The root layout is shared for the entire application

import React from 'react';

export default function RootLayout(props: React.PropsWithChildren) {
    return (
        <html lang='en'>
            <body>{props.children}</body>
        </html>
    );
}
