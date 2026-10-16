/* =====================================================
   MSU CONNECT
   JAVASCRIPT MODULE
   DSI236
===================================================== */


/* =====================================================
   EVENT DATABASE
===================================================== */

const events = [

    {
        id: 1,

        title: "AI & Data Science Career Talk",

        category: "academic",

        day: "Monday",

        date: "12 October 2026",

        time: "10:00 AM",

        venue: "Innovation Hub",

        image: "assets/images/ai.jpg",

        description:
            "A career session discussing artificial intelligence, data science and opportunities available to university students."
    },


    {
        id: 2,

        title: "Interfaculty Football Challenge",

        category: "sports",

        day: "Tuesday",

        date: "13 October 2026",

        time: "3:00 PM",

        venue: "Main Sports Field",

        image: "assets/images/football.jpg",

        description:
            "An interfaculty football competition promoting teamwork, physical activity and student interaction."
    },


    {
        id: 3,

        title: "Creative Arts Showcase",

        category: "culture",

        day: "Wednesday",

        date: "14 October 2026",

        time: "5:30 PM",

        venue: "University Amphitheatre",

        image: "assets/images/arts.jpg",

        description:
            "Students showcase music, drama, poetry, dance and other creative performances."
    },


    {
        id: 4,

        title: "Student Innovation Pitch Night",

        category: "academic",

        day: "Thursday",

        date: "15 October 2026",

        time: "6:00 PM",

        venue: "Lecture Theatre 2",

        image: "assets/images/innovation.jpg",

        description:
            "Students present innovative technology and business ideas to a panel of judges."
    },


    {
        id: 5,

        title: "Campus Wellness Walk",

        category: "sports",

        day: "Friday",

        date: "16 October 2026",

        time: "7:00 AM",

        venue: "Student Centre Gate",

        image: "assets/images/wellness.jpg",

        description:
            "A wellness activity promoting physical fitness and healthy lifestyles among students."
    },


    {
        id: 6,

        title: "Coding Club Web Development Workshop",

        category: "social",

        day: "Saturday",

        date: "17 October 2026",

        time: "9:00 AM",

        venue: "Computer Laboratory 4",

        image: "assets/images/innovation.jpg",

        description:
            "A practical workshop where students learn how to design and develop interactive websites."
    }

];


/* =====================================================
   APPLICATION STATE
===================================================== */

let savedEvents =
    JSON.parse(
        localStorage.getItem("msuPlanner")
    ) || [];


let currentEvent = null;


/* =====================================================
   ELEMENTS
===================================================== */

const eventGrid =
    document.getElementById("eventGrid");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const dayFilter =
    document.getElementById("dayFilter");

const clearFilters =
    document.getElementById("clearFilters");

const eventCount =
    document.getElementById("eventCount");

const plannerList =
    document.getElementById("plannerList");

const plannerEmpty =
    document.getElementById("plannerEmpty");

const plannerCount =
    document.getElementById("plannerCount");

const clearPlanner =
    document.getElementById("clearPlanner");

const eventModal =
    document.getElementById("eventModal");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalDate =
    document.getElementById("modalDate");

const modalTime =
    document.getElementById("modalTime");

const modalVenue =
    document.getElementById("modalVenue");

const modalDescription =
    document.getElementById("modalDescription");

const modalSave =
    document.getElementById("modalSave");

const toast =
    document.getElementById("toast");

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


/* =====================================================
   LOCAL STORAGE
===================================================== */

function savePlanner() {

    localStorage.setItem(
        "msuPlanner",
        JSON.stringify(savedEvents)
    );

}


/* =====================================================
   CHECK SAVED
===================================================== */

function isSaved(id) {

    return savedEvents.includes(id);

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   DISPLAY EVENTS
===================================================== */

function renderEvents() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const day =
        dayFilter.value;


    const filtered =
        events.filter(event => {

            const text = (

                event.title +
                " " +
                event.venue +
                " " +
                event.description

            ).toLowerCase();


            const searchMatch =
                text.includes(search);


            const categoryMatch =
                category === "all" ||
                event.category === category;


            const dayMatch =
                day === "all" ||
                event.day === day;


            return (
                searchMatch &&
                categoryMatch &&
                dayMatch
            );

        });


    eventGrid.innerHTML = "";


    if (filtered.length === 0) {

        emptyState.hidden = false;

        return;

    }


    emptyState.hidden = true;


    filtered.forEach(event => {

        const card =
            document.createElement("article");


        card.className =
            "event-card";


        const saved =
            isSaved(event.id);


        card.innerHTML = `

            <img
                src="${event.image}"
                alt="${event.title}"
                class="event-image">


            <div class="event-content">

                <span class="event-category">
                    ${event.category}
                </span>


                <h3>
                    ${event.title}
                </h3>


                <div class="event-meta">

                    <span>
                        📅 ${event.day}, ${event.date}
                    </span>

                    <span>
                        🕐 ${event.time}
                    </span>

                    <span>
                        📍 ${event.venue}
                    </span>

                </div>


                <div class="event-actions">

                    <button
                        class="btn btn-primary details-btn"
                        data-id="${event.id}">

                        View Details

                    </button>


                    <button
                        class="btn btn-secondary save-btn"
                        data-id="${event.id}">

                        ${saved ? "✓ Saved" : "Save"}

                    </button>

                </div>

            </div>

        `;


        eventGrid.appendChild(card);

    });

}


/* =====================================================
   PLANNER
===================================================== */

function renderPlanner() {

    plannerList.innerHTML = "";


    const saved =
        events.filter(
            event =>
                savedEvents.includes(event.id)
        );


    plannerCount.textContent =
        saved.length;


    if (saved.length === 0) {

        plannerEmpty.style.display =
            "block";

        return;

    }


    plannerEmpty.style.display =
        "none";


    saved.forEach(event => {

        const item =
            document.createElement("div");


        item.className =
            "planner-item";


        item.innerHTML = `

            <div>

                <h3>
                    ${event.title}
                </h3>

                <p>
                    📅 ${event.day},
                    ${event.date}
                </p>

                <p>
                    🕐 ${event.time}
                    |
                    📍 ${event.venue}
                </p>

            </div>


            <button
                class="btn btn-secondary remove-btn"
                data-id="${event.id}">

                Remove

            </button>

        `;


        plannerList.appendChild(item);

    });

}


/* =====================================================
   SAVE / REMOVE
===================================================== */

function toggleSaved(id) {

    if (isSaved(id)) {

        savedEvents =
            savedEvents.filter(
                savedId => savedId !== id
            );


        showToast(
            "Event removed from planner."
        );

    }

    else {

        savedEvents.push(id);


        showToast(
            "Event saved to planner."
        );

    }


    savePlanner();

    renderEvents();

    renderPlanner();


    updateModalButton();

}


/* =====================================================
   MODAL
===================================================== */

function openModal(id) {

    const event =
        events.find(
            item => item.id === id
        );


    if (!event) return;


    currentEvent = event;


    modalImage.src =
        event.image;


    modalImage.alt =
        event.title;


    modalCategory.textContent =
        event.category;


    modalTitle.textContent =
        event.title;


    modalDate.textContent =
        "📅 " +
        event.day +
        ", " +
        event.date;


    modalTime.textContent =
        "🕐 " +
        event.time;


    modalVenue.textContent =
        "📍 " +
        event.venue;


    modalDescription.textContent =
        event.description;


    updateModalButton();


    eventModal.classList.add("open");


    eventModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   MODAL BUTTON
===================================================== */

function updateModalButton() {

    if (!currentEvent) return;


    if (isSaved(currentEvent.id)) {

        modalSave.textContent =
            "Remove from Planner";

    }

    else {

        modalSave.textContent =
            "Save to Planner";

    }

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {

    eventModal.classList.remove("open");


    eventModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    currentEvent = null;

}


/* =====================================================
   EVENT CLICK
===================================================== */

eventGrid.addEventListener(
    "click",
    function(event) {


        const details =
            event.target.closest(
                ".details-btn"
            );


        const save =
            event.target.closest(
                ".save-btn"
            );


        if (details) {

            openModal(
                Number(details.dataset.id)
            );

        }


        if (save) {

            toggleSaved(
                Number(save.dataset.id)
            );

        }

    }
);


/* =====================================================
   PLANNER CLICK
===================================================== */

plannerList.addEventListener(
    "click",
    function(event) {

        const remove =
            event.target.closest(
                ".remove-btn"
            );


        if (!remove) return;


        toggleSaved(
            Number(remove.dataset.id)
        );

    }
);


/* =====================================================
   FILTERING
===================================================== */

searchInput.addEventListener(
    "input",
    renderEvents
);


categoryFilter.addEventListener(
    "change",
    renderEvents
);


dayFilter.addEventListener(
    "change",
    renderEvents
);


/* =====================================================
   CLEAR FILTERS
===================================================== */

clearFilters.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        categoryFilter.value =
            "all";

        dayFilter.value =
            "all";


        renderEvents();

    }
);


/* =====================================================
   CLEAR PLANNER
===================================================== */

clearPlanner.addEventListener(
    "click",
    function() {

        savedEvents = [];


        savePlanner();

        renderEvents();

        renderPlanner();


        showToast(
            "Planner cleared."
        );

    }
);


/* =====================================================
   MODAL EVENTS
===================================================== */

modalClose.addEventListener(
    "click",
    closeModal
);


document.querySelector(
    ".modal-overlay"
).addEventListener(
    "click",
    closeModal
);


modalSave.addEventListener(
    "click",
    function() {

        if (currentEvent) {

            toggleSaved(
                currentEvent.id
            );

        }

    }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener(
    "click",
    function() {

        const open =
            mainNav.classList.toggle(
                "open"
            );


        menuToggle.setAttribute(
            "aria-expanded",
            open
        );

    }
);


/* Close menu */

mainNav.querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function() {

                mainNav.classList.remove(
                    "open"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* =====================================================
   INITIALISE
===================================================== */

eventCount.textContent =
    events.length;


renderEvents();

renderPlanner();