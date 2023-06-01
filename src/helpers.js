export function get(url, params, callback)
{
    fetch(url + '?' + new URLSearchParams(params), {
        method: 'GET',
    }).then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw error
            })
        }
        return response.json()
    }).then(data => {
        callback(data)
    }).catch(error => {
        console.log(error?.message ?? error)
    })
}