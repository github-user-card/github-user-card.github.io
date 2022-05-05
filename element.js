if (!customElements.get("github-user-card")) {
  const css = /*css */ `<style>
    :host {
        display: inline-block;
    }

    .user {
        font-family: "Helvetica", Arial, sans-serif;
        display: inline-block;
        width: 265px;
        height: 300px;
        overflow: hidden;
        border-radius: 6px;
        position: relative;
        background-color: #2E353C;
        text-align: center;
        color: #fff;
        font-weight: 100;
        transition: background 1000ms ease-out;
    }

    .user dl,
    .user dd {
        margin: 0;
    }

    .user dt {
        display: none;
    }

    .user-data {
        background: #fff url('src/assets/github.png') no-repeat 5px 5px;
        background-size: 25px;
        height: 85px;
        border: 1px solid #D5D5D5;
        border-bottom: 0;
    }

    dd.user-avatar {
        display: inline-block;
        margin: 20px 0 10px;
    }

    .user-avatar img {
        border-radius: 100%;
        height: 120px;
        width: 120px;
        border: 3px solid #fff;
        vertical-align: middle;
        background-color: #fff;
    }

    dd.user-name,
    dd.user-account {
        margin: 5px 0;
    }

    .user-name {
        font-size: 24px;
    }

    .user-account {
        font-size: 16px;
        color: #999;
        margin: 5px 0;
    }

    .user-stats {
        border-top: 1px groove #999;
        position: relative;
        top: 155px;
    }

    .user-stats dd {
        padding: 10px 20px;
    }

    .user-repos,
    .user-following,
    .user-followers {
        display: inline-block;
        font-size: 22px;
        color: #999;
    }

    .user-repos:after,
    .user-following:after,
    .user-followers:after {
        content: attr(data-stats);
        text-transform: uppercase;
        display: block;
        font-size: 11px;
        color: #666;
        font-weight: normal;
        line-height: 1.7em;
    }

    .spinner {
        background: url('src/assets/spinner.gif') no-repeat center center;
    }

    a.user-github-url,
    a.user-repos-url,
    a.user-followers-url {
        text-decoration: none;
    }
</style>`;

  const html = /*html */ `<article class="user spinner">
<dl class="user-data" hidden>
    <dt>Avatar:</dt>
    <dd class="user-avatar">
        <img src="">
    </dd>

    <dt>Fullname:</dt>
    <dd class="user-name"></dd>

    <dt>Account:</dt>
    <a class="user-github-url">
        <dd class="user-account"></dd>
    </a>
</dl>
<dl class="user-stats" hidden>
    <dt>Repos</dt>
    <a class="user-repos-url">
        <dd class="user-repos" data-stats="repos"></dd>
    </a>

    <dt>Followers</dt>
    <a class="user-followers-url">
        <dd class="user-followers" data-stats="followers"></dd>
    </a>
</dl>
</article>
`;
  customElements.define(
    "github-user-card",
    class extends HTMLElement {
      constructor() {
        super().attachShadow({
          mode: "open",
        }).innerHTML = css + html;
      }

      async connectedCallback() {
        const { name, avatar_url, public_repos, followers, html_url } =
          await await fetch(
            `https://api.github.com/users/${this.getAttribute("user")}`,
            {
              headers: {
                Authorization: "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",
              },
            }
          ).then((res) => res.json());

        this.shadowRoot.querySelector(".user-account").textContent =
          this.getAttribute("user");
        this.shadowRoot.querySelector(".user-name").textContent = name;
        this.shadowRoot.querySelector(".user-avatar img").src = avatar_url;
        this.shadowRoot.querySelector(".user-repos").textContent = public_repos;
        this.shadowRoot.querySelector(".user-followers").textContent =
          followers;

        this.shadowRoot.querySelector(".user").classList.remove("spinner");
        this.shadowRoot.querySelector(".user-data").removeAttribute("hidden");
        this.shadowRoot.querySelector(".user-stats").removeAttribute("hidden");

        this.shadowRoot.querySelector(".user-github-url").href = html_url;
        this.shadowRoot.querySelector(".user-repos-url").href =
          html_url.concat("?tab=repositories");
        this.shadowRoot.querySelector(".user-followers-url").href =
          html_url.concat("?tab=followers");
      }
    }
  );
}
