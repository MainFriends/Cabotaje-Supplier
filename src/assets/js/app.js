const runApp = () => {
    const sidebar = document.querySelector('#sidebarToggle');
    const items = document.querySelectorAll('.collapse-item');
    
    const handleClick = () => {
        const accordionSidebar = document.querySelector('#accordionSidebar');
        if(!accordionSidebar.classList.contains('toggled')){
            const collapse = document.querySelectorAll('li .collapse');
            const navLinks = document.querySelectorAll('.dinamic');
            collapse.forEach(element => {
                element.classList.remove("show");
            });
            navLinks.forEach(element => {
                element.classList.add("collapsed");
            })
        }
    }
    
    const handleClickItem = () => {
        const accordionSidebar = document.querySelector('#accordionSidebar');
        if(accordionSidebar.classList.contains('toggled')){
            const collapse = document.querySelectorAll('li .collapse');
            const navLinks = document.querySelectorAll('.dinamic');
            collapse.forEach(element => {
                element.classList.remove("show");
            });
            navLinks.forEach(element => {
                element.classList.add("collapsed");
            })
        }
    }

    sidebar.addEventListener('click', handleClick);
    items.forEach(item => {
        item.addEventListener('click', handleClickItem);
    })
}

export default runApp;