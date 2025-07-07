
// CHART DIMENSIONS
const width = 1000;
const height = 800;
const marginTop = 40;
const marginRight = 30;
const marginBottom = 70;
const marginLeft = 70;

const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

// X-SCALE 
const x = d3.scaleLinear()
    .domain([2019, 2025])
    .range([marginLeft, width - marginRight]);
    

// Y-SCALE
const y = d3.scaleLinear()
    .domain([0, 10])
    .range([height - marginBottom, marginTop]);

// SVG CONTAINER CREATION
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height);

// APPEND X-AXIS
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickValues(years).tickFormat(d3.format(".0f")));

// APPEND Y-AXIS
svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

// APPEND X-AXIS AND Y-AXIS NAMES
svg.append("text")
    .attr("x", 550)
    .attr("y", 790)
    .text("Years (Start of College)")
    .style("text-anchor", "middle")

svg.append("text")
    .attr("transform", "rotate(90)")
    .attr("x", 360)
    .attr("y", -10)
    .text("Difficulty (0 Easy - 10 Hard)")
    .style("text-anchor", "middle")

// APPEND SVG NODE BACK TO THE DIV CLASS
d3plot.append(svg.node());

// DATA POINTS 
const data = [
    {year: 2019.1, difficulty: 8, shape: "circle"},
    {year: 2020, difficulty: 9, shape: "circle"},
    {year: 2021, difficulty: 5, shape: "triangle"},
    {year: 2022, difficulty: 2, shape: "circle"},
    {year: 2023, difficulty: 7, shape: "triangle"},
    {year: 2024, difficulty: 4, shape: "triangle"},
    {year: 2025, difficulty: 6, shape: "circle"},
]

// LINE CREATED USING X AND Y 
const line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.difficulty));

svg.append("path")
    .attr("fill", "none")
    .attr("d", line(data))
    .attr("stroke", "currentColor");

// DATA POINT CREATED AND CIRCLE / TRIANGLE IS DETERMINED BY SHAPE GIVEN IN OBJECTS OF DATA ARRAY
svg.selectAll("path.point")
    .data(data)
    .enter()
    .append("path")
    .attr("class", "point")
    .attr("transform", d => `translate(${x(d.year)}, ${y(d.difficulty)})`)
    .attr("d", d3.symbol()
        .type(d => d.shape === "circle" ? d3.symbolCircle : d3.symbolTriangle)
        .size(200)
    )
    .attr("fill", d => d.shape === "circle" ? "blue" : "#C11C84")

// Y-AXIS TICKS ARE COLOR DEFINED BY DIFFICULTY, RED BEING HARD AND GREEN BEING EASY
svg.selectAll(".y-axis .tick text")
    .attr("fill", d => {
        if (d >= 8) return "red";
        else if (d >= 4) return "orange";
        else return "green";
    });

// SETS SIZE AND WEIGHT OF THE TICKS ON X AND Y AXIS
svg.selectAll(".x-axis text, .y-axis text")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
