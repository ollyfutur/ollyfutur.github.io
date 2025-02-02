let oldelem = document.querySelector("script#include_header");
let newelem = document.createElement("header");

var links = {
    "About": "#about",
    "Links": "#links",
    "Publications": "#publications",
}

let template = `
<h1>
    <a href="index.html">Olivier <span class="nobreak">Languin–Cattoën</span></a>
</h1>
<p>Postdoctoral Researcher</p>
<nav>
    <ul>`;

for (const [key, value] of Object.entries(links)) {
    template += `
        <li>
            <a href="${value}">${key}</a>
        </li>`;
}

template += `
    </ul>
</nav>
`;


newelem.innerHTML = template;
oldelem.parentNode.replaceChild(newelem,oldelem);
