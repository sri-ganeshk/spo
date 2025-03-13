import axios from "axios";
async function fetchData() {
    const res = await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details')
    return res.data;
}
export default async function () {
    const info = await fetchData();
    return (
        <div>
            {info.name}
            {info.email}
        </div>
    )
}