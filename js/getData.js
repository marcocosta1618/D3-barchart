export default function getData() {
    const dataURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

    return d3.json(dataURL).then(json => {
        const gdpDates = json.data.map(arr => arr[0]);
        const gdpValues = json.data.map(arr => arr[1]);
        return {
            gdpDates, 
            gdpValues 
        }
    })
}