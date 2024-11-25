
export default function Page({
    params,
} : {
    params: {
        id: string;
    }
})
 {
    return (
        <div>
            <h1>DWH Setting Details `{params.id}`</h1>
        </div>
    );
}