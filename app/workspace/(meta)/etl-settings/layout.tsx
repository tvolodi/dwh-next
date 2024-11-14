function Layout ({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <>
            <h1>ETL Settings Layout</h1>
            {children}
        </>
    )
}

export default Layout;