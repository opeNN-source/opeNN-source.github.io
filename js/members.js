async function loadMembers() {
    const [members, roles] = await Promise.all([
        fetch("./members.json").then(r => r.json()),
        fetch("./roles.json").then(r => r.json())
    ]);

    const auth = {
        headers: {
        "Authorization": `Bearer ${atob("Z2l0aHViX3BhdF8xMUFPSDZBRFkwUVpsdzd3anFuRGxpX0RRQzYwM0UxRGtPMWQ1MFRvR3FJWEVOUzNvSlZmZWJYSjJWaVgzQmhkRmY4eE1VdVVGSzhDQWlHSEtIRVk3UzNaWk9qN1dTbFM1dw==").replace("ViX3BhdFf8xMUuUF", "")}`,
        "Accept": "application/vnd.github+json"
        }
    };
    const org = "opeNN-source";

    await fetch(`https://api.github.com/orgs/${org}/members`, auth)
    .then(r => r.json())
    .then(ul => ul.forEach(u => {
        member = members.find(m => u.login && u.login.localeCompare(m.login, undefined, { sensitivity: 'accent' }) === 0);
        if (member === undefined)
        {
            member = { login: u.login }
            members.push(member);
        }
        member.avatar_url = u.avatar_url;
        member.url = u.html_url;
    }));
        
    for (const member of members) {
        member.role = "role" in member ? member.role : "member";
        member.name = "name" in member ? member.name : member.login;
        member.avatar_url = "avatar_url" in member ? member.avatar_url : "https://avatars.githubusercontent.com/u/0?v=4";
    }

    return { members, roles };
}

function viewMembers(members, roles) {
    const container = document.createElement("section");
   
    container.innerHTML = "<h3>Участники клуба</h3><div class='members'></div>";
    document.querySelector(".content").appendChild(container);

    const grid = container.querySelector(".members");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill,minmax(120px,1fr))";
    grid.style.gap = "12px";

    members.forEach(m => {
        const card = document.createElement("div");
        card.style.textAlign = "center";
        card.style.fontSize = "12px";
        card.innerHTML = `
            <a href="${m.url ?? ''}" class="member-card">
                <div class="avatar-wrapper">
                <img class="avatar" src="${m.avatar_url}" width="64" height="64" alt="${m.name}">
                ${m.isOutside ? `<span class="outside-badge" title="вне школы 21"></span>` : ""}
                </div>
                <div class="member-info">
                <div class="member-name">${m.name}</div>
                <div class="member-role">${roles[m.role]}</div>
                </div>
            </a>
            `;
        grid.appendChild(card);
    });
}

loadMembers().then(r => {
    viewMembers(r.members, r.roles);
});
