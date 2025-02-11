import React from 'react'
import NavigationBar from '@/components/navigation-bar'


function Layout({ children }) {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    )
}

export default Layout
