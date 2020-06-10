let posts = []

async function fetchData() {
    await fetch('https://www.instagram.com/barejr.am/?__a=1')
        .then(response => response.json()
            .then(data => {
                data.graphql.user.edge_owner_to_timeline_media.edges.forEach(element => {

                    posts.push({
                        title: element.node.display_url,
                        description: element.node.edge_media_to_caption.edges == 0 ? "" : element.node.edge_media_to_caption.edges[0].node.text
                    })

                });
                this.info = data.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_liked_by.count
                console.log(data)
            }))
    console.log(posts)
    load()
    document.getElementById("cards").style.justifyContent = "center"
}

loaded = 5
id = 0
timer = 300

function load() {
    var myVar = setInterval(() => {
        if (id === loaded) {
            clearInterval(myVar)
        }
        else {
            addCard(posts[id])
            id++;
        }
    }, timer);
}


function addCard(object) {
    const work = document.getElementById('cards');

    const content = `
        <div class="card">
            <div class="link"><i class="fab fa-instagram"></i></div>
            <img src="${object.title}" width="100%"/>
        </div>
    `

    work.innerHTML += content;
}