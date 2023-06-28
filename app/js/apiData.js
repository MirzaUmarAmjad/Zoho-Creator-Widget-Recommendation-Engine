import { handleViewBtn, tabsNoDataMsg, apiData } from "./custom.js";

var companyID = "";
let filteredDots = [];
let firstDotID = "";

ZOHO.CREATOR.init().then(function (data) {
  var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
  var allRecommendationsList = [];
  if(queryParams?.selectedDOTid && queryParams?.selectedAttackVectorID){
    const recommendationsConfig = {
      appName: "customer-portal",
      reportName: "All_Recommendation_Engines",
      page: 1,
      pageSize: 100,
      criteria: "(DOT == " + queryParams?.selectedDOTid + "&& Reptile_Index_Theory_Attack_Vector == " + queryParams?.selectedAttackVectorID + ")",
    };
    const contentDiv = document.getElementById("category-data");
    contentDiv.innerHTML = `
      <div class="text-center loader-div">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;
    ZOHO.CREATOR.API.getAllRecords(recommendationsConfig)
      .then((response) => {
        if (response.data.length > 0) {
          let dotListDiv = "";
          const sortedArray = _.sortBy(response.data, "Priority").reverse();
          dotListDiv += `<li><a class="dropdown-item" id="dot-dropdown" dot-id=${sortedArray[0]?.DOT?.ID}>${sortedArray[0]?.DOT?.display_value}</a></li>`;
          document.getElementById("dot-list").innerHTML =dotListDiv;
          document.getElementById("dotListDropdown").innerText =
          sortedArray[0]?.DOT?.display_value;
          const vectorBadgeName =document.getElementById("vector-name");
          const vectorBadgeDiv =document.getElementById("vector-div");
          const vectorCloseBtn =document.getElementById("vector-close");
         
          vectorBadgeDiv.style.display = "inline-flex";
          vectorBadgeDiv.style.opacity = 1;
          vectorBadgeDiv.style.visibility = "visible";
          vectorBadgeName.innerText =  sortedArray[0]?.Reptile_Index_Theory_Attack_Vector?.display_value;
          allRecommendationsList = sortedArray;
          const reptileIndexData = sortedArray.filter(  
            (recom) => recom?.Attack_Vector_Type === "Reptile Theory"
          );
          const beyondComplianceData = sortedArray.filter(
            (recom) => recom?.Attack_Vector_Type === "Beyond Compliance"
          );
          tabsNoDataMsg(reptileIndexData,sortedArray,beyondComplianceData, queryParams);
          const div = document.getElementById("vector-div")
          if(document.getElementById("vector-div")){
  
            handleViewBtn(allRecommendationsList, queryParams);
          }
          
          vectorCloseBtn.addEventListener('click', () => {
            delete queryParams?.selectedDOTid;
            delete queryParams?.selectedAttackVectorID;
            vectorBadgeDiv.style.display = "none";
            vectorBadgeDiv.style.opacity = 0;
            vectorBadgeDiv.style.visibility = "hidden";
            window.open(getDomain() + "/bluewire/customer-portal/#Page:Recommendation_Engine_S","_parent");
          });
          
        }
      })
  }
  if (Object.keys(queryParams).length > 0 && !(queryParams?.selectedDOTid && queryParams?.selectedAttackVectorID)) {
    apiData(companyID, allRecommendationsList, filteredDots,firstDotID,queryParams)
  }

});