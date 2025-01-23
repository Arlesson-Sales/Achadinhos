async function loadLinksData(file_path)
{
    try
    {
        const request = await window.fetch(file_path);
        if (request.status == 200 && request.ok)
            return await request.json();
    }
    catch(error) {
        console.error(error, error.message);
    }
}

function createLinksButtons(links_data)
{
    const links_section_body = document.createElement("div");
    const links_list = document.createElement("ul");

    links_section_body.classList.add("links-section-body");
    links_section_body.appendChild(links_list);

    for (let link of links_data)
    {
        const list_item = document.createElement("li");
        list_item.innerHTML = `
            <a class="link-button" href="${link.href}" target="_blank">
                <div class="link-button-icon" style="background-image: url(../assets/icons/${link.type}).webp"></div>
                <p>${link.name}</p>
            </a>
        `;
        links_list.appendChild(list_item);
    }
    return links_section_body;
}

function createLinkSectionHTML({ data })
{
    for (let section_data of data)
    {
        const html_section = document.createElement("section");
        html_section.classList.add("links-section");
        html_section.innerHTML = `
            <header>
                <div class="links-section-header">
                    <div class="header-background" style="background-image: url(${section_data.background})">
                        <div class="links-section-titles">
                            <h4>${section_data.title}</h4>
                            <h5>${section_data.sub_title}</h5>
                        </div>
                    </div>
                </div>
                <div class="links-search-input">
                    <input type="search" placeholder="Pesquise aqui">
                    <div class="search-icon"></div>
                </div>
            </header>
        `
        const links_buttons_list = createLinksButtons(section_data.links);
        html_section.appendChild(links_buttons_list);

        document.body.children[1].appendChild(html_section);
    }
}

// Fazendo o carregamento dos links e sua devida criação no documento HTML.
window.addEventListener("load", async () => {
    const FILEPATH = "./data/links.json";
    const links_data = await loadLinksData(FILEPATH);
    createLinkSectionHTML(links_data);
});