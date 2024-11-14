
function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    return (
        <>
            <div>
                <h1>DWH Settings Layout</h1>
            </div>
            <br></br>
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout;