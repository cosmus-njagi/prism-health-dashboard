<script>
    async function doRequest() {

        let url = 'http://httpbin.org/post';
        let data = {'name': 'John Doe', 'occupation': 'John Doe'};

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.ok) {

            // let text = await res.text();
            // return text;

            let ret = await res.json();
            return JSON.parse(ret.data);

        } else {
            return `HTTP error: ${res.status}`;
        }
    }

    doRequest().then(data => {
        console.log(data);
    });

</script>