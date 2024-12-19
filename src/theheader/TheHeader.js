

// Define the enum for the header style
const EnumTheHeaderStyle = {
    transparent: "transparent",
    blanc: "white"
};

// Define the enum for the header status
const EnumTheHeaderStatus = {
    CLOSED: "CLOSED",
    OPENED: "OPENED"
};


class TheHeaderDesktop {
    header;
    constructor(el) {
        this.header = el;
        this.style = this.header.dataset.style;
        this.logo = document.querySelector('.TheHeader__desktop__logo');
        this.init();
    }

    init() {
        this.setStyle();
    }

    setStyle() {
        const heroIsOnPage = document.querySelector('.wp-block-post-content')?.firstElementChild?.classList.contains('TheHero');
        this.style = heroIsOnPage ? EnumTheHeaderStyle.transparent : EnumTheHeaderStyle.blanc;
        this.header.dataset.style = this.style;
        this.changeLogo();
    }

    changeLogo() {
        if (this.style === EnumTheHeaderStyle.transparent) {
            const path = this.logo.src;
            const trimPath = path.substring(0, path.lastIndexOf("/"));
            this.logo.src = `${trimPath}/logo-maisons-neho-white.svg`;
        }
    }

    static bind(className) {
        const sections = document.querySelectorAll(className);
        sections.forEach((section) => new TheHeaderDesktop(section));
    }
}

class TheHeaderMobile {
    header;
    constructor(el) {
        this.header = el
        this.status = this.header.dataset.status === undefined ? EnumTheHeaderStatus.CLOSED : this.header.dataset.status;
        this.header.dataset.status = this.status;
        this.buttonOpen = document.querySelector(".TheHeader__toggle");

        if (this.header === null) {
            throw new SyntaxError('HTMLElement .TheHeader inexistant');
        }
        if (this.buttonOpen === null) {
            throw new SyntaxError(`HTMLElement .TheHeader__toggle inexistant`);
        }
        this.init();
    }

    init() {
        this.buttonOpen.addEventListener("click", () => {
            this.status === EnumTheHeaderStatus.CLOSED ? this.open() : this.close();
        });

        this.createAccordion();
    }

    open() {
        this.header.dispatchEvent(new Event('open'));
        this.setStatus(EnumTheHeaderStatus.OPENED);
    }

    close() {
        this.header.dispatchEvent(new Event('close'));
        this.setStatus(EnumTheHeaderStatus.CLOSED);
    }

    destroy() {
        this.status = EnumTheHeaderStatus.CLOSED;
        this.setStatus(EnumTheHeaderStatus.CLOSED);
    }

    createAccordion() {
        const subMenus = this.header.querySelectorAll('.menu-item-has-children');

        subMenus.forEach(submenu => {
            const firstLink = submenu.querySelector('* > a');
            const wrapper = document.createElement('div');
            const toggle = document.createElement('button');
            toggle.classList.add('TheHeader__accordion__toggle');

            let submenuItems = submenu.querySelector('.sub-menu');

            submenu.dataset.status = EnumTheHeaderStatus.CLOSED;
            wrapper.classList.add('TheHeader__accordion__header');

            submenu.appendChild(wrapper);
            firstLink && wrapper.appendChild(firstLink);
            wrapper.appendChild(toggle);
            submenuItems && wrapper.after(submenuItems);

            toggle.addEventListener('click', (el) => {
                this.switchSubMenuState(el.target);
            });
        });
    }

    switchSubMenuState(el) {
        el.parentNode.parentNode.dataset.status === EnumTheHeaderStatus.CLOSED ? this.openSubMenu(el.parentNode.parentNode) : this.closeSubMenu(el.parentNode.parentNode);
    }

    closeSubMenu(element) {
        element.dataset.status = EnumTheHeaderStatus.CLOSED;
    }

    openSubMenu(element) {
        element.dataset.status = EnumTheHeaderStatus.OPENED;
    }

    setStatus(newStatus) {
        this.status = newStatus;
        if (this.header !== null)
            this.header.dataset.status = newStatus;

        this.header.dispatchEvent(new Event('status'));
    }

    static bind(className) {
        const sections = document.querySelectorAll(className);
        sections.forEach((section) => new TheHeaderMobile(section));
    }
}


class PhoneButton {
    static nameOfClass = ".TheHeader__phone";
    button;
    phone_number;
    constructor(el) {
        this.button = el;
        this.phone_number = this.button.querySelector('[data-number]').dataset.number;
        this.init();
    }
    init() {
        this.button.addEventListener('click', () => {
            this.button.href = "tel:" + this.phone_number;
            this.button.querySelector('[data-number]').click();

        })
    }
    static bind() {
        const sections = document.querySelectorAll(this.nameOfClass);
        sections.forEach((section) => new PhoneButton(section));
    }
}

PhoneButton.bind(".TheHeader__phone")
TheHeaderDesktop.bind(".TheHeader__desktop");
TheHeaderMobile.bind(".TheHeader__mobile");