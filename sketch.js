/* =====================================================
   MSU CONNECT
   P5.JS MODULE
   DSI236
===================================================== */


/* =====================================================
   CAMPUS ACTIVITY DATA
===================================================== */

const campusActivities = [

    {
        name: "Library",
        value: 70
    },

    {
        name: "Sports",
        value: 50
    },

    {
        name: "Arts",
        value: 82
    },

    {
        name: "Technology",
        value: 92
    },

    {
        name: "Social",
        value: 75
    },

    {
        name: "Clubs",
        value: 60
    }

];


let canvasWidth = 600;

let canvasHeight = 300;


/* =====================================================
   SETUP
===================================================== */

function setup() {

    const container =
        document.getElementById(
            "p5-container"
        );


    if (!container) {

        return;

    }


    canvasWidth =
        container.clientWidth;


    const canvas =
        createCanvas(
            canvasWidth,
            canvasHeight
        );


    canvas.parent(
        "p5-container"
    );


    textFont(
        "Inter"
    );

}


/* =====================================================
   DRAW
===================================================== */

function draw() {

    clear();


    const container =
        document.getElementById(
            "p5-container"
        );


    if (!container) {

        return;

    }


    const width =
        container.clientWidth;


    const barWidth =
        width /
        campusActivities.length;


    /* ===============================
       BACKGROUND GRID
    =============================== */

    stroke(
        255,
        255,
        255,
        25
    );


    for (
        let y = 40;
        y <= 250;
        y += 50
    ) {

        line(
            0,
            y,
            width,
            y
        );

    }


    noStroke();


    /* ===============================
       BARS
    =============================== */

    campusActivities.forEach(
        (activity, index) => {


            const movement =
                sin(
                    frameCount * 0.035 +
                    index
                ) * 8;


            const currentValue =
                activity.value +
                movement;


            const barHeight =
                map(
                    currentValue,
                    0,
                    100,
                    25,
                    220
                );


            const x =
                index *
                barWidth +
                10;


            const y =
                255 -
                barHeight;


            /* BAR */

            fill(
                80,
                145,
                245,
                220
            );


            rect(
                x,
                y,
                barWidth - 20,
                barHeight,
                8
            );


            /* VALUE */

            fill(
                255
            );


            textAlign(
                CENTER
            );


            textSize(
                12
            );


            text(
                Math.round(currentValue),
                x +
                (barWidth - 20) / 2,
                y - 8
            );


            /* LABEL */

            fill(
                220,
                230,
                245
            );


            textSize(
                10
            );


            text(
                activity.name,
                x +
                (barWidth - 20) / 2,
                278
            );

        }
    );

}


/* =====================================================
   RESPONSIVE CANVAS
===================================================== */

function windowResized() {

    const container =
        document.getElementById(
            "p5-container"
        );


    if (!container) {

        return;

    }


    resizeCanvas(
        container.clientWidth,
        canvasHeight
    );

}