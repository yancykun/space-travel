const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
let tabFocus = 0;

tabList.addEventListener('keydown', handleTabKeyDown);
tabs.forEach((tab) => tab.addEventListener('click', handleTabClick));

function handleTabKeyDown(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute('tabindex', -1);

        if (e.keyCode === keydownRight) {
            tabFocus = (tabFocus + 1) % tabs.length;
        }

        if (e.keyCode === keydownLeft) {
            tabFocus = (tabFocus - 1 + tabs.length) % tabs.length;
        }

        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
    }
}

function handleTabClick(e) {
    const targetTab = e.target;
    const targetPanelId = targetTab.getAttribute('aria-controls');
    const targetImageId = targetTab.getAttribute('data-image');

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    // Update tab selection
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute('aria-selected', false);
    targetTab.setAttribute('aria-selected', true);

    // Hide all tab panels
    mainContainer
        .querySelectorAll('[role="tabpanel"]')
        .forEach((panel) => panel.setAttribute('hidden', true));

    // Show the target tab panel
    const targetPanel = mainContainer.querySelector(`#${targetPanelId}`);
    targetPanel.removeAttribute('hidden');

    // Hide all images
    mainContainer
        .querySelectorAll('picture')
        .forEach((element) => element.classList.add('hidden'));

    // Show the target image
    const targetImage = mainContainer.querySelector(`#${targetImageId}`);
    targetImage.classList.remove('hidden');
}
