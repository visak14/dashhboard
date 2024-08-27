import { useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { SlCalender } from "react-icons/sl";
import { Grid } from "react-loader-spinner";
function Charts() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [selectedTopics, setSelectedTopics] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPestle, setSelectedPestle] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedSwot, setSelectedSwot] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLikelihood , setSelectedLikelihood] = useState("")
  const [selectedIntensity , setSelecteIntensity] = useState("")
  const [countries, setCountries] = useState([]);
  const [sources, setSources] = useState([]);
  const [pestles, setPestles] = useState([]);
  const [regions, setRegions] = useState([]);
  const [sectors, setSectors] = useState([])
  const [endYears, setEndYears] = useState([]);
  const [topics , setTopics] = useState([]);
  const [likelihoods , setLikelihoods] = useState([])
  const [intensity , setIntensity] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading , setLoading] = useState(false)

  // Fetch data on component mount
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/data");
        const fullData = response.data;
        setData(fullData);
        setFilteredData(fullData);

        
        const uniqueCountries = [
          ...new Set(fullData.map((item) => item.country)),
        ];
        setCountries(uniqueCountries);
        const uniqueSources = [...new Set(fullData.map((item) => item.source))];
        setSources(uniqueSources);

        const uniquePestles = [...new Set(fullData.map((item) => item.pestle))];
        setPestles(uniquePestles);

        const uniqueRegions = [...new Set(fullData.map((item) => item.region))];
        setRegions(uniqueRegions);

        const uniqueSector = [...new Set(fullData.map((item) => item.sector))];
        setSectors(uniqueSector);

        const uniqueEndYear = [...new Set(fullData.map((item) => item.end_year))];
        setEndYears(uniqueEndYear);

        const uniqueTopic = [...new Set(fullData.map((item) => item.topic))];
        setTopics(uniqueTopic);


        const uniqueLikelihood = [...new Set(fullData.map((item) => item.likelihood))];
        setLikelihoods(uniqueLikelihood);

        const uniqueIntensity = [...new Set(fullData.map((item) => item.intensity))];
        setIntensity(uniqueIntensity);

        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let updatedData = data;

    // Apply only the active filter
    if (selectedCountry) {
      updatedData = updatedData.filter(
        (item) => item.country === selectedCountry
      );
    } else if (selectedEndYear) {
      updatedData = updatedData.filter(
        (item) => item.end_year === selectedEndYear
      );
    } else if (selectedTopics) {
      updatedData = updatedData.filter((item) => item.topic === selectedTopics);
    } else if (selectedSector) {
      updatedData = updatedData.filter(
        (item) => item.sector === selectedSector
      );
    } else if (selectedRegion) {
      updatedData = updatedData.filter(
        (item) => item.region === selectedRegion
      );
    } else if (selectedPestle) {
      updatedData = updatedData.filter(
        (item) => item.pestle === selectedPestle
      );
    } else if (selectedSource) {
      updatedData = updatedData.filter(
        (item) => item.source === selectedSource
      );
    } else if (selectedSwot) {
      updatedData = updatedData.filter((item) => item.swot === selectedSwot);
    } else if (selectedCity) {
      updatedData = updatedData.filter((item) => item.city === selectedCity);
    }
      else if (selectedLikelihood) {
        updatedData = updatedData.filter((item) => item.likelihood === selectedLikelihood);
      }
    else if (startDate && endDate) {
      updatedData = updatedData.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setFilteredData(updatedData);
  }, [
    selectedCountry,
    selectedEndYear,
    selectedTopics,
    selectedSector,
    selectedRegion,
    selectedPestle,
    selectedSource,
    selectedSwot,
    selectedCity,
    selectedLikelihood,
    startDate,
    endDate,
    data,
  ]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
   
    setSelectedEndYear("");
    setSelectedTopics("");
    setSelectedSector("");
    setSelectedRegion("");
    setSelectedPestle("");
    setSelectedSource("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
   
    setSelectedEndYear("");
    setSelectedTopics("");
    setSelectedSector("");
    setSelectedRegion("");
    setSelectedPestle("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };

  const handlePestleChange = (event) => {
    setSelectedPestle(event.target.value);
    
    setSelectedEndYear("");
    setSelectedTopics("");
    setSelectedSector("");
    setSelectedRegion("");
    setSelectedSource("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    
    setSelectedEndYear("");
    setSelectedTopics("");
    setSelectedSector("");
    setSelectedPestle("");
    setSelectedSource("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };


  const handleSectorChange = (event) => {
    setSelectedSector(event.target.value);
  
    setSelectedEndYear("");
    setSelectedTopics("");
    setSelectedRegion("");
    setSelectedPestle("");
    setSelectedSource("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };


  
  const handleEndYearChange = (event) => {
    setSelectedEndYear(event.target.value);
   
    setSelectedSector("");
    setSelectedTopics("");
    setSelectedRegion("");
    setSelectedPestle("");
    setSelectedSource("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleTopicChange = (event) => {
    setSelectedTopics(event.target.value);
   
    setSelectedSector("");
    setSelectedEndYear("");
    setSelectedRegion("");
    setSelectedPestle("");
    setSelectedSource("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };


  const handleLikelihoodChange = (event) => {
    setSelectedLikelihood(event.target.value);
    
    setSelectedTopics("")
    setSelectedSector("");
    setSelectedEndYear("");
    setSelectedRegion("");
    setSelectedPestle("");
    setSelectedSource("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleIntensityChange = (event) => {
    setSelecteIntensity(event.target.value);
   
    setSelectedLikelihood("")
    setSelectedTopics("")
    setSelectedSector("");
    setSelectedEndYear("");
    setSelectedRegion("");
    setSelectedPestle("");
    setSelectedSource("");
    setSelectedCountry("");
    setSelectedSwot("");
    setSelectedCity("");
    setStartDate(null);
    setEndDate(null);
  };

  // Render the intensity bar chart
  useEffect(() => {
    if (filteredData.length > 0) {
      const svgWidth = 600; 
      const svgHeight = 600; 
      const margin = { top: 20, right: 70, bottom: 100, left: 70 }; 

      
      d3.select("#countryChart").selectAll("*").remove();

      const svg = d3
        .select("#countryChart")
        .attr("width", svgWidth + margin.left + margin.right)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3
        .scaleBand()
        .domain(filteredData.map((d) => d.sector))
        .range([0, svgWidth])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData, (d) => d.intensity) || 1])
        .nice()
        .range([svgHeight, 0]);

      
      const colorScale = d3
        .scaleOrdinal(d3.schemeCategory10)
        .domain(filteredData.map((d) => d.sector));

     
      svg
        .append("g")
        .attr("transform", `translate(0, ${svgHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

     
      svg.append("g").call(d3.axisLeft(y));

      
      svg
        .selectAll(".bar")
        .data(filteredData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.sector))
        .attr("y", (d) => {
          const yValue = y(d.intensity);
          return isNaN(yValue) ? svgHeight : yValue;
        })
        .attr("width", x.bandwidth())
        .attr("height", (d) => {
          const heightValue = svgHeight - y(d.intensity);
          return isNaN(heightValue) ? 0 : heightValue;
        })
        .attr("fill", (d) => colorScale(d.sector)); 

     
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", svgWidth / 2)
        .attr("y", svgHeight + margin.bottom - 0)
        .text("Sector");

     
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -svgHeight / 2)
        .attr("y", -margin.left + 15)
        .text("Intensity");
    }
  }, [filteredData]);

  
  useEffect(() => {
    if (filteredData.length > 0) {
      const width = 600; 
      const height = 600; 
      const margin = { top: 20, right: 70, bottom: 100, left: 70 };
      const radius = Math.min(width, height) / 2; 
      const levels = 5; 
      const angleSlice = (Math.PI * 2) / filteredData.length; 

      d3.select("#likelihoodChart").selectAll("*").remove();

      const svg = d3
        .select("#likelihoodChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr(
          "transform",
          `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`
        );

      // Scale for the radar chart, taking both likelihood and intensity into account
      // const radialScale = d3
      //   .scaleLinear()
      //   .domain([0, d3.max(data, (d) => d.intensity) || 1]) // Use intensity for the scaling, fallback to 1
      //   .range([0, radius]);
      const maxIntensity = d3.max(filteredData, (d) => isNaN(d.intensity) ? 0 : d.intensity) || 1;
      const radialScale = d3.scaleLinear().domain([0, maxIntensity]).range([0, radius]);

      
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

     
      const radarLine = d3
        .lineRadial()
        .curve(d3.curveLinearClosed)
        .radius((d) => radialScale(d.intensity) || 0) 
        .angle((d, i) => i * angleSlice);

      // Draw grid
      for (let i = 0; i < levels; i++) {
        svg
          .append("circle")
          .attr("r", (radius / levels) * (i + 1))
          .attr("fill", "none")
          .attr("stroke", "lightgray");
      }

      
      svg
        .append("path")
        .datum(filteredData)
        .attr("d", (d) => {
          try {
            return radarLine(d);
          } catch (e) {
            console.error("Error generating path:", e);
            return "";
          }
        })
        .attr("fill", colorScale(0)) 
        .attr("stroke", colorScale(0)) 
        .attr("stroke-width", 1);

      
      svg
      .selectAll(".dot")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => {
        const intensity = isNaN(d.intensity) ? 0 : d.intensity; 
        const angle = isNaN(d.index) ? 0 : angleSlice * d.index - Math.PI / 2;
        const x = radialScale(intensity) * Math.cos(angle);
        return isNaN(x) ? 0 : x; 
      })
      .attr("cy", (d) => {
        const intensity = isNaN(d.intensity) ? 0 : d.intensity; 
        const angle = isNaN(d.index) ? 0 : angleSlice * d.index - Math.PI / 2;
        const y = radialScale(intensity) * Math.sin(angle);
        return isNaN(y) ? 0 : y; 
      })
      .attr("r", 6) 
      .attr("fill", (d) => colorScale(d.index));
    

      
      
      

      svg
        .selectAll(".country-label")
        .data(data.filter((d) => d.intensity === maxIntensity))
        .enter()
        .append("text")
        .attr("class", "country-label")
        .attr("x", (d) => {
          const x =
            radialScale(d.intensity) *
            Math.cos(angleSlice * d.index - Math.PI / 2);
          return isNaN(x) ? 0 : x; 
        })
        .attr("y", (d) => {
          const y =
            radialScale(d.intensity) *
            Math.sin(angleSlice * d.index - Math.PI / 2);
          return isNaN(y) ? 0 : y; 
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", (d) => {
          const angle = angleSlice * d.index;
          return angle > Math.PI && angle < 2 * Math.PI ? "end" : "start";
        })
        .attr("fill", "#333")
        .text((d) => d.country);
    }
  }, [data, filteredData]);

  useEffect(() => {
    const filteredData = selectedCountry
      ? data.filter((item) => item.country === selectedCountry)
      : data;

    // Group data by sector
    const groupedData = d3
      .rollups(
        filteredData,
        (v) => d3.sum(v, (d) => d.intensity),
        (d) => d.sector
      )
      .map(([sector, intensity]) => ({ sector, intensity }));

    if (groupedData.length > 0) {
      const width = 600;
      const height = 600;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      // Clear the previous chart
      d3.select("#sectorChart").selectAll("*").remove();

      const svg = d3
        .select("#sectorChart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const pie = d3
        .pie()
        .value((d) => d.intensity)
        .sort(null);

      const arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      const arcLabel = d3
        .arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

      const pieData = pie(groupedData);

      const slices = svg
        .selectAll(".slice")
        .data(pieData)
        .enter()
        .append("g")
        .attr("class", "slice");

      slices
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.sector));

      slices
        .append("text")
        .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .text((d) => d.data.sector);

      
      svg
        .append("text")
        .attr("x", 0)
        .attr("y", -radius - 20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Sector Chart");

      
      const legendRectSize = 18;
      const legendSpacing = 4;
      const legend = svg
        .selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => {
          const height = legendRectSize + legendSpacing;
          const offset = (height * color.domain().length) / 2;
          const horz = radius + 20;
          const vert = i * height - offset;
          return `translate(${horz},${vert})`;
        });

      legend
        .append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", color)
        .style("stroke", color);

      legend
        .append("text")
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing)
        .style("font-size", "12px")
        .text((d) => d);
    }
  }, [data, selectedCountry]);

  useEffect(() => {
    if (filteredData.length > 0) {
      const width = 600;
      const height = 600;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      d3.select("#regionChart").selectAll("*").remove();

      const svg = d3
        .select("#regionChart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const pie = d3
        .pie()
        .value((d) => d.intensity) 
        .sort(null);

      const arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(radius / 2);

    //   const arcLabel = d3
    //     .arc()
    //     .outerRadius(radius - 40)
    //     .innerRadius(radius - 40);

      const pieData = pie(filteredData);

      const slices = svg
        .selectAll(".slice")
        .data(pieData)
        .enter()
        .append("g")
        .attr("class", "slice");

      slices
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.region));

      // slices.append("text")
      //     .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      //     .attr("dy", "0.35em")
      //     .style("text-anchor", "middle")
      //     .style("font-size", "10px")
      //     .text(d => d.data.region);

      svg
        .append("text")
        .attr("x", 0)
        .attr("y", -radius - 20)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Region Distribution");

      const legendRectSize = 18;
      const legendSpacing = 4;
      const legend = svg
        .selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => {
          const height = legendRectSize + legendSpacing;
          const offset = (height * color.domain().length) / 2;
          const horz = radius + 20;
          const vert = i * height - offset;
          return `translate(${horz},${vert})`;
        });

      legend
        .append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", color)
        .style("stroke", color);

      legend
        .append("text")
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing)
        .style("font-size", "6px")
        .text((d) => d);
    }
  }, [data , filteredData]);

  useEffect(() => {
    if (filteredData.length > 0) {
      const width = 600;
      const height = 600;
      const margin = { top: 20, right: 70, bottom: 100, left: 70 };

      d3.select("#relevanceChart").selectAll("*").remove();

      const svg = d3
        .select("#relevanceChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Set up scales
      const xScale = d3
        .scaleLinear()
        .domain([
          d3.min(filteredData, (d) => d.likelihood) - 0.5,
          d3.max(filteredData, (d) => d.likelihood) + 0.5,
        ])
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(filteredData, (d) => d.impact) - 0.5,
          d3.max(filteredData, (d) => d.impact) + 0.5,
        ])
        .range([height, 0]);

      const relevanceScale = d3
        .scaleSqrt()
        .domain([0, d3.max(filteredData, (d) => d.relevance)])
        .range([0, 20]);

      const intensityScale = d3
        .scaleSqrt()
        .domain([0, d3.max(filteredData, (d) => d.intensity)])
        .range([0, 20]);

      const colorScale = d3
        .scaleOrdinal()
        .domain(["Relevance", "Intensity"])
        .range(["skyblue", "pink"]);

      
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

      svg.append("g").call(d3.axisLeft(yScale));

      
      svg
        .selectAll(".relevance-circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("class", "relevance-circle")
        .attr("cx", (d) => xScale(d.likelihood))
        .attr("cy", (d) => yScale(d.impact))
        .attr("r", (d) => relevanceScale(d.relevance))
        .style("fill", "skyblue")
        .style("opacity", 0.7);

      
      svg
        .selectAll(".intensity-circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("class", "intensity-circle")
        .attr("cx", (d) => xScale(d.likelihood))
        .attr("cy", (d) => yScale(d.impact))
        .attr("r", (d) => intensityScale(d.intensity))
        .style("fill", "pink")
        .style("opacity", 0.5);

      
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Likelihood");

      
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 10)
        .attr("x", -height / 2)
        .attr("dy", "-1em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Impact");

      
      const legend = svg
        .selectAll(".legend")
        .data(colorScale.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          (d, i) => `translate(${width - margin.right - 20},${i * 20})`
        );

      legend
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", colorScale);

      legend
        .append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", "12px")
        .text((d) => d);
    }
  }, [data, filteredData]);

  useEffect(() => {
    if (filteredData.length > 0) {
        renderRadarChart(filteredData);
    }
}, [filteredData, data]);



const renderRadarChart = (data) => {
  if (!data || data.length === 0) {
      console.error("No data provided to renderRadarChart.");
      return;
  }

  
  const cleanData = data.map((d, i) => ({
      intensity: isNaN(d.intensity) ? 0 : d.intensity, 
      topic: d.topic || "Unknown", 
      index: d.index !== undefined ? d.index : i, 
  }));

  const width = 600;
  const height = 600;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const radius = Math.min(width, height) / 2;
  const levels = 5;
  const angleSlice = Math.PI * 2 / cleanData.length;

 
  d3.select("#topicsChart").selectAll("*").remove();

  const svg = d3.select("#topicsChart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${(width / 2) + margin.left}, ${(height / 2) + margin.top})`);

  const maxIntensity = d3.max(cleanData, d => isNaN(d.intensity) ? 0 : d.intensity);
  const radialScale = d3.scaleLinear()
      .domain([0, maxIntensity || 1]) 
      .range([0, radius]);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const radarLine = d3.lineRadial()
      .curve(d3.curveLinearClosed)
      .radius(d => radialScale(d.intensity))
      .angle((d, i) => i * angleSlice);

  
  for (let i = 0; i < levels; i++) {
      svg.append("circle")
          .attr("r", radius / levels * (i + 1))
          .attr("fill", "none")
          .attr("stroke", "lightgray");
  }

  
  svg.append("path")
      .datum(cleanData)
      .attr("d", d => {
          try {
              return radarLine(d);
          } catch (e) {
              console.error("Error generating radar path:", e);
              return "";
          }
      })
      .attr("fill", colorScale(0))
      .attr("stroke", colorScale(0))
      .attr("stroke-width", 2);

  
  svg.selectAll(".dot")
      .data(cleanData)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", (d, i) => {
          const x = radialScale(d.intensity) * Math.cos(angleSlice * i - Math.PI / 2);
          return isNaN(x) ? 0 : x; 
      })
      .attr("cy", (d, i) => {
          const y = radialScale(d.intensity) * Math.sin(angleSlice * i - Math.PI / 2);
          return isNaN(y) ? 0 : y; 
      })
      .attr("r", 3)
      .attr("fill", d => colorScale(d.index));

  // Optionally, you can uncomment and enhance the topic labels section
  // svg.selectAll(".topic-label")
  //     .data(cleanData)
  //     .enter().append("text")
  //     .attr("class", "topic-label")
  //     .attr("x", (d, i) => radialScale(d.intensity) * Math.cos(angleSlice * i - Math.PI / 2) * 1.1)
  //     .attr("y", (d, i) => radialScale(d.intensity) * Math.sin(angleSlice * i - Math.PI / 2) * 1.1)
  //     .attr("dy", "0.35em")
  //     .attr("text-anchor", "middle")
  //     .attr("fill", "#333")
  //     .text(d => d.topic);
};




useEffect(() => {
  

  if (filteredData.length > 0) {
    const svgWidth = 600;
    const svgHeight = 600;
    const margin = { top: 20, right: 70, bottom: 100, left: 70 };

   
    d3.select("#intensityChart").selectAll("*").remove();

    const svg = d3
      .select("#intensityChart")
      .attr("width", svgWidth + margin.left + margin.right)
      .attr("height", svgHeight + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.end_year))
      .range([0, svgWidth])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.intensity) || 1])
      .nice()
      .range([svgHeight, 0]);

    const colorScale = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(filteredData.map((d) => d.end_year));

   
    svg
      .append("g")
      .attr("transform", `translate(0, ${svgHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    
    svg.append("g").call(d3.axisLeft(y));

   
    svg
      .selectAll(".bar")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => {
        const xValue = x(d.end_year);
        
        return isNaN(xValue) ? 0 : xValue;
      })
      .attr("y", (d) => {
        const yValue = y(d.intensity);
        
        return isNaN(yValue) ? svgHeight : yValue;
      })
      .attr("width", x.bandwidth())
      .attr("height", (d) => {
        const heightValue = svgHeight - y(d.intensity);
        return isNaN(heightValue) ? 0 : heightValue;
      })
      .attr("fill", (d) => colorScale(d.end_year));

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", svgWidth / 2)
        .attr("y", svgHeight + margin.bottom - 20)
        .text("Year");

     
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -svgHeight / 2)
        .attr("y", -margin.left + 15)
        .text("Intensity");
  }
}, [filteredData]);



if (loading ) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
      <div className="bg-transparent p-6 rounded-md z-50 w-auto">
        <Grid
          visible={true}
          height="40"
          width="40"
          color="#FFC0CB"
          ariaLabel="grid-loading"
          radius="12.5"
        />
      </div>
    </div>
  );
}


  return (
    <div className="w-full h-full flex ">
    <div className="flex flex-col lg:flex-row h-auto w-full justify-between">
      <div className="flex flex-col  mt-2 rounded-md p-2 w-full lg:w-64">
        <p className="mx-10 text-2xl font-sans">All Filters</p>
        {[
          { name: 'Country', value: selectedCountry, onChange: handleCountryChange, options: countries },
        
          { name: 'Intnsity', value: selectedIntensity, onChange: handleIntensityChange, options: intensity},
          { name: 'Source', value: selectedSource, onChange: handleSourceChange, options: sources },
          { name: 'Pestle', value: selectedPestle, onChange: handlePestleChange, options: pestles },
          { name: 'Region', value: selectedRegion, onChange: handleRegionChange, options: regions },
          { name: 'Likelihood', value: selectedLikelihood, onChange: handleLikelihoodChange, options: likelihoods },
          { name: 'Sector', value: selectedSector, onChange: handleSectorChange, options: sectors },
          { name: 'End Year', value: selectedEndYear, onChange: handleEndYearChange, options: endYears },
          { name: 'Topics', value: selectedTopics, onChange: handleTopicChange, options: topics },

        ].map(({ name, value, onChange, options }, index) => (
          <div key={index} className="my-56">
            <label className="block mb-2 text-sm font-medium">{name}</label>
            <select
              value={value}
              onChange={onChange}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select {name}</option>
              {options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
  
      <div className="flex flex-col lg:ml-4 mt-4 lg:mt-0 w-full lg:w-[calc(100%-16rem)] h-full ">
        {[
          { id: 'countryChart', title: 'Country Chart' },
          { id: 'likelihoodChart', title: 'Likelihood Chart' },
          { id: 'sectorChart', title: 'Sector Chart' },
          { id: 'regionChart', title: 'Region Chart' },
          { id: 'relevanceChart', title: 'Relevance Chart' },
          {id : 'topicsChart' , title: 'Topic Chart'},
          {id: 'intensityChart', title: 'Intensity Chart'}
        ].map(({ id, title }, index) => (
          <div key={index} className="flex  flex-col items-center mb-2">
            <h2 className="text-lg lg:text-xl font-bold mb-2">{title}</h2>
            <div className="w-full h-full ">
              <svg id={id} className=" lg:mx-32 "></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  

  
  );
}

export default Charts;
