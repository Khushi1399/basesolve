
export const addData = (payload) => (
    {
        type: "ADD",
        payload
    }
)

export const listData = () => {
    return {
        type: "LIST"
    }
}