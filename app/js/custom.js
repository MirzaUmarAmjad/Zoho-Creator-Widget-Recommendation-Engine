export const displayCompanydata = (divId, categories) => {
  let categoryListDiv = "";
  const href = window.location.href;
  const host = href.split("?")[1].split("=")[1].replace("%3A%2F%2F", "://");
  return categories?.map((item) => {
    categoryListDiv += `
     <div class="row g-1">
      <div class="col-md-2 col-lg-1">
        <div class="p-3 bg-light align-center">
          <img src=${`assets/Priority-` + item?.Priority + `.png`} alt="" />
        </div>
      </div>
      <div class="col-md-10 col-lg-11">
        <div class="row g-1" style="height:100%">
          <div class="col-md-6 col-lg-9" id=${`category-list-div-`+divId+"-"+item.ID}>
            <div class="p-3 bg-light category" id="category-list">
              <img id="company-icon" class="company-icon" src=${
                host+item.Attack_Vector_Active_Logo_URL
              } onLoad="this.onLoad" alt="">
              <div class="company-details">
                <h3 class="company-title">
                  <span>${item?.Recommendation_Title || ""}</span>
                  ${
                    item?.Attack_Vector_Type === "Beyond Compliance"
                      ? `<img src="assets/compliance-Tag.png" alt="title">`
                      : ""
                  }
                </h3>
                <h5 class="subtitle">${
                  item?.Reptile_Index_Theory_Critical_Factors?.display_value || ""
                }</h5>
                ${
                  item?.Recommendation_Engine_Ally?.length === 0
                    ? `<div class="hide" id=${
                        `customer-list-` + divId + "-" + item.ID
                      }>
                  <div class="customer-details">
                    <div class="customer-desc">
                      ${item?.Recommendation_Long_Description || ""}
                    </div>
                  </div>
                  ${
                    item?.Call_to_Action?.length
                      ? item?.Call_to_Action?.map((action) => {
                          return `<button class="primary-btn mb-2 mt-3" id="action-btn" vector-id=${item?.Reptile_Index_Theory_Attack_Vector?.ID} name=${action.split(' ').join('-')}>${action}</button>`;
                        }).join(" ")
                      : ""
                  }
                </div>`
                    : ""
                }
                <div style="padding:0!mportant" class="hide container-fluid" id=${
                  `allies-list-` + divId + "-" + item.ID
                }>  
                </div>
                <button id=${`detail-btn-` + divId + "-" + item.ID} class="detail-btn" data-id=${item.ID} div-id=${divId} index=${divId + "-" + item.ID}>VIEW DETAIL</button>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-lg-1" id=${`recommendation-actions-`+ divId + "-" + item.ID}>
            <div class="p-3 bg-light align-center">
              ${item?.Product === "true" ? `<img src="assets/cart.png" alt="" />` : ""}
            </div>
          </div>
          <div class="col-md-2 col-lg-1" id=${`recommendation-actions-`+ divId + "-" +item.ID}>
            <div class="p-3 bg-light align-center">
              ${item?.Service === "true" ? `<img src="assets/service.png" alt="" />` : ""}
            </div>
          </div>
          <div class="col-md-2 col-lg-1" id=${`recommendation-actions-`+ divId + "-" +item.ID}>
            <div class="p-3 bg-light align-center">
              ${item?.Manage === "true"? `<img src="assets/manage.png" alt="" />` : ""}
            </div>
          </div>
        </div>
      </div>
      </div> 
     `;
    document.getElementById(divId).innerHTML = categoryListDiv;
  });
};

export const tabsNoDataMsg = (reptileIndexData, sortedArray,beyondComplianceData ) =>{
  if(reptileIndexData?.length === 0){
    const reptileDiv = document.getElementById("reptileIndex-data");
    reptileDiv.innerHTML = `<p class="no-data text-center">No Data Found</p>
    `
  }else{
    displayCompanydata("reptileIndex-data", reptileIndexData);
  }
  if(sortedArray?.length === 0){
    const reptileDiv = document.getElementById("category-data");
    reptileDiv.innerHTML = `<p class="no-data text-center">No Data Found</p>
    `
  }else{
    displayCompanydata("category-data", sortedArray);
  }
  if(beyondComplianceData?.length === 0){
    const reptileDiv = document.getElementById("beyondCompliance-data");
    reptileDiv.innerHTML = `<p class="no-data text-center">No Data Found</p>
    `
  }else{
    displayCompanydata("beyondCompliance-data", beyondComplianceData);
  }
}

export const handleViewBtn = (allRecommendationsList, queryParams) => {
  const btn = document.querySelector(`body`);
  
  const vectorDiv = document.getElementById(`vector-div`).style.display;
  btn.addEventListener("click", function (e) {
    const btnId = e.target.getAttribute("id");
    if(vectorDiv !== "none" && e.target.getAttribute("id") !== "vector-close"){
    const id = e.target.getAttribute("data-id");
    const divId = e.target.getAttribute("div-id");
    const index = e.target.getAttribute("index");
    const detailDiv = document.getElementById(
      `customer-list-` + index
      );
      const alliesDiv = document.getElementById(`allies-list-` + index);
      const selectedRecommendation = allRecommendationsList.find(recom => recom.ID == id);
      if (
        e.target.innerText.toLowerCase() == "view detail" ||
        e.target.innerText.toLowerCase() == "view less"
        ) {
          const btn = document.getElementById(`detail-btn-` + index);
      if (e.target.innerText.toLowerCase() == "view detail") {
        btn.innerText = "VIEW LESS";
        if (alliesDiv !== null) {
          alliesDiv.style.display = "block";
          alliesDiv.style.opacity = 1;
          alliesDiv.style.visibility = "visible";
        } if (detailDiv !== null) {
          detailDiv.style.display = "block";
          detailDiv.style.opacity = 1;
          detailDiv.style.visibility = "visible";
        }
        if(selectedRecommendation?.Recommendation_Engine_Ally?.length){
          const categoryDiv =document.querySelectorAll(`*[id=category-list-div-${divId + "-" +selectedRecommendation.ID}]`);
          const actionsDiv =document.querySelectorAll(`*[id=recommendation-actions-${divId + "-" +selectedRecommendation.ID}]`);
          for (var i = 0; i < categoryDiv.length; i++) {
            categoryDiv.item(i).classList.remove("col-md-6", "col-lg-9");
            categoryDiv.item(i).classList.add("col-md-12");

          }
          for (var i = 0; i < actionsDiv.length; i++) {
            actionsDiv.item(i).style.display="none";
            actionsDiv.item(i).style.opacity=0;
            actionsDiv.item(i).style.visibility="hidden";
            }

            let alliesList = [];
            selectedRecommendation?.Recommendation_Engine_Ally?.length
              ? selectedRecommendation?.Recommendation_Engine_Ally?.map(
                  (ally) => {
                    const recommendationAllyConfig = {
                      appName: "customer-portal",
                      reportName: "All_Recommendation_Engine_Allies",
                      id: ally.ID,
                    };

                    //get specific record API
                    ZOHO.CREATOR.API.getRecordById(
                      recommendationAllyConfig
                    ).then(function (response) {
                      if (response?.data) {
                        alliesList.push(response.data);
                        const sortedArray = _.sortBy(
                          alliesList,
                          "Priority"
                        ).reverse();
                        alliesList = sortedArray;
                        const list = alliesList.map((allyItem) => {
                          return `
                          <div class="row g-1" >
                            <div class="col-md-9 border-line" style="border-right: 4px solid #fff;">
                              <div class="customer-details">
                                <img class="company-icon" src=${
                                  `assets/Priority-` +
                                  allyItem?.Priority +
                                  `.png`
                                } alt="title">
                                <div class="customer-desc">
                                  <h3 class="customer-name">${
                                    ally?.display_value || ""
                                  }</h3>
                                  ${allyItem?.Description || ""}
                                </div>
                              </div>
                              ${
                                allyItem?.Call_to_Action?.length
                                  ? allyItem?.Call_to_Action?.map((action) => {
                                      return `<button class="primary-btn mb-2 mt-3" id="action-btn" vector-id=${selectedRecommendation?.Reptile_Index_Theory_Attack_Vector?.ID} name=${action.split(' ').join('-')}>${action}</button>`;
                                    }).join(" ")
                                  : ""
                              }
                            </div>
                            <div class="col-md-3">
                              <div class="container-fluid" style="height:100%">
                                <div class="row g-1" style="height:100%">
                                  <div class="col-md-4 col-lg-4 border-line cart-line" style="border-right: 4px solid #fff">
                                    <div class="p-3 bg-light border-top-bottom align-center mt-5" style="position:relative">
                                      ${
                                        allyItem?.Product === "true"
                                          ? `<img src="assets/cart.png" alt="" />`
                                          : ""
                                      }
                                    </div>
                                  </div>
                                  <div class="col-md-4 col-lg-4 border-line service-line" style="border-right: 4px solid #fff" >
                                    <div class="p-3 bg-light align-center mt-5" style="position:relative">
                                      ${
                                        allyItem?.Service === "true"
                                          ? `<img src="assets/service.png" alt="" />`
                                          : ""
                                      }
                                    </div>
                                  </div>
                                  <div class="col-md-4 col-lg-4">
                                    <div class="p-3 bg-light align-center mt-5" >
                                      ${
                                        allyItem?.Manage === "true"
                                          ? `<img src="assets/manage.png" alt="" />`
                                          : ""
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                            `;
                        }).join(" ");
                        alliesDiv.innerHTML = list;
                      }
                    });
                  }
                )
              : null;
        }
      } else if(btn.innerText.toLowerCase() == "view less") {
        btn.innerText = "VIEW DETAIL";
        
        if (alliesDiv !== null) {
          alliesDiv.style.display = "none";
          alliesDiv.style.opacity = 0;
          alliesDiv.style.visibility = "hidden";
        } if (detailDiv !== null) {
          detailDiv.style.display = "none";
          detailDiv.style.opacity = 0;
          detailDiv.style.visibility = "hidden";
        }
        const categoryDiv =document.querySelectorAll(`*[id=category-list-div-${divId + "-" +selectedRecommendation.ID}]`);
        const actionsDiv =document.querySelectorAll(`*[id=recommendation-actions-${divId + "-" +selectedRecommendation.ID}]`);
        for (var i = 0; i < categoryDiv.length; i++) {
          categoryDiv.item(i).classList.add("col-md-6", "col-lg-9");
          categoryDiv.item(i).classList.remove("col-md-12");

        }
        for (var i = 0; i < actionsDiv.length; i++) {
          actionsDiv.item(i).style.display = "block";
          actionsDiv.item(i).style.opacity = 1;
          actionsDiv.item(i).style.visibility = "visible";
        }
        
      }
    }
  }
  if(btnId === "action-btn"){
    const name = e.target.getAttribute("name");
    const vectorId = e.target.getAttribute("vector-id");
    if(name.split("-").join(" ") === "View Products"){
      window.open(getDomain() + `/bluewire/customer-portal/#Page:Resources_S?loginUserEmail=`+queryParams["loginUserEmail"]+`&selectedAttackVectorID=`+ vectorId, "_parent")
    } else if(name.split("-").join(" ") === "Manage Accounts"){
      window.open(getDomain() + `/bluewire/customer-portal/#Page:Account_Connection_Status?loginUserEmail=`+queryParams["loginUserEmail"], "_parent")
    }else if(name.split("-").join(" ") === "Engage an Expert"){
      window.open(getDomain() + `/bluewire/customer-portal/#Page:Resources_S?loginUserEmail=`+queryParams["loginUserEmail"] + `&tagName=Engage an Expert`, "_parent")
    
    }else if(name.split("-").join(" ") === "Hire a Consultant"){
      window.open(getDomain() + `/bluewire/customer-portal/#Page:Resources_S?loginUserEmail=`+queryParams["loginUserEmail"] + `&tagName=Hire a Consultant`, "_parent")
    }
  }
  });

}

export const apiData = (companyID, allRecommendationsList,filteredDots, firstDotID,queryParams) => {
  const vectorBadgeDiv =document.getElementById("vector-div");

  vectorBadgeDiv.style.display = "none";

  var config = {
    appName: "customer-portal",
    reportName: "All_Users",
    page: 1,
    pageSize: 1,
    criteria: '(ID == ' + queryParams["loginUserEmail"] + ')',
  };

  ZOHO.CREATOR.API.getAllRecords(config)
    .then((response) => {
      if (response.data.length > 0) {
        companyID = response.data[0]["Company"]["ID"];
        return companyID;
      }
    })
    .then((companyID) => {
      //fetch all dots under the company
      const dotsConfig = {
        appName: "customer-portal",
        reportName: "DOTs",
        page: 1,
        pageSize: 100,
        criteria: "(Company == " + companyID + ")",
      };  
      ZOHO.CREATOR.API.getAllRecords(dotsConfig)
        .then((response) => {
          if (response?.data?.length > 0) {
            const allDots = response?.data;
            return allDots;
          }
        })
        .then((allDots) => {
          //fetch all dots under the company
          allDots.map((dot) => {
            const recommendationsConfig = {
              appName: "customer-portal",
              reportName: "All_Recommendation_Engines",
              page: 1,
              pageSize: 100,
              criteria: "(DOT == " + dot.ID + ")",
            };
            ZOHO.CREATOR.API.getAllRecords(recommendationsConfig)
              .then((response) => {
                if (response?.data?.length > 0) {
                  const allRecommendations = response?.data;
                  return allRecommendations;
                }
              })
              .then((allRecommendations) => {
                const list = allDots.filter((dotItem) => {
                  return allRecommendations?.find(
                    (recom) => recom.DOT.ID === dotItem.ID
                  );
                });
                if (!filteredDots.includes(...list)) {
                  filteredDots.push(...list);
                  let dotListDiv = "";
                  const sortedArray = _.sortBy(filteredDots, "ID");
                  filteredDots = sortedArray;
                  filteredDots?.map((dot) => {
                    dotListDiv += `<li><a class="dropdown-item" id="dot-dropdown" dot-id=${dot.ID}>${dot.Name}</a></li>`;
                    document.getElementById("dot-list").innerHTML =
                      dotListDiv;
                    document.getElementById("dotListDropdown").innerText =
                      filteredDots[0].Name;
                      firstDotID = filteredDots[0].ID;
                  });
                //fetch all recommendations under the company's first DOT
                  const recommedationConfig = {
                    appName: "customer-portal",
                    reportName: "All_Recommendation_Engines",
                    page: 1,
                    pageSize: 100,
                    criteria: "(Company == " + companyID + "&&Complete == false" + "&&DOT == " + firstDotID + ")",
                  };
                  const contentDiv = document.getElementById("category-data");
                  contentDiv.innerHTML = `
                  <div class="text-center loader-div">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  `;
                  ZOHO.CREATOR.API.getAllRecords(recommedationConfig).then((response) => {
                    const sortedArray = _.sortBy(response.data, "Priority").reverse();
                    allRecommendationsList = sortedArray;
                    const reptileIndexData = sortedArray.filter(
                      (recom) => recom?.Attack_Vector_Type === "Reptile Theory"
                    );
                    const beyondComplianceData = sortedArray.filter(
                      (recom) => recom?.Attack_Vector_Type === "Beyond Compliance"
                    );
                    tabsNoDataMsg(reptileIndexData,sortedArray,beyondComplianceData);

                  });
                  return filteredDots;
                }
              })
          })
          return filteredDots
          
        })
        .then(() => {
          const dropdownItem = document.getElementById("dot-list");
          const dropdownBtn = document.getElementById("dotListDropdown");
          dropdownItem.addEventListener("click", function (e) {
            const dotId = e.target.getAttribute("dot-id");
            dropdownBtn.innerText = e.target.innerText;
            const recommendationsConfig = {
              appName: "customer-portal",
              reportName: "All_Recommendation_Engines",
              page: 1,
              pageSize: 100,
              criteria: "(DOT == " + dotId + ")",
            };
            ZOHO.CREATOR.API.getAllRecords(recommendationsConfig).then(
              (response) => {
                const sortedArray = _.sortBy(
                  response.data,
                  "Priority"
                ).reverse();
                allRecommendationsList = sortedArray;
                const reptileIndexData = sortedArray.filter(
                  (recom) => recom?.Attack_Vector_Type === "Reptile Theory"
                );
                const beyondComplianceData = sortedArray.filter(
                  (recom) => recom?.Attack_Vector_Type === "Beyond Compliance"
                );
                tabsNoDataMsg(reptileIndexData,sortedArray,beyondComplianceData);

              }
            );
          });
        })  
        .then(() => {
          const body = document.querySelector(`body`);
          body.addEventListener("click", function (e) {
            const id = e.target.getAttribute("data-id");
            const divId = e.target.getAttribute("div-id");
            const index = e.target.getAttribute("index");
            const btnId = e.target.getAttribute("id");
            const detailDiv = document.getElementById(
              `customer-list-` + index
            );
            const alliesDiv = document.getElementById(`allies-list-` + index);
            const selectedRecommendation = allRecommendationsList.find(recom => recom.ID == id);

            if (
              e.target.innerText.toLowerCase() == "view detail" ||
              e.target.innerText.toLowerCase() == "view less"
              ) {
                const btn = document.getElementById(`detail-btn-` + index);
                if (e.target.innerText.toLowerCase() == "view detail") {
                btn.innerText = "VIEW LESS";
                if (alliesDiv !== null) {
                  alliesDiv.style.display = "block";
                  alliesDiv.style.opacity = 1;
                  alliesDiv.style.visibility = "visible";
                } if (detailDiv !== null) {
                  detailDiv.style.display = "block";
                  detailDiv.style.opacity = 1;
                  detailDiv.style.visibility = "visible";
                }
                if(selectedRecommendation?.Recommendation_Engine_Ally?.length){
                  const categoryDiv =document.querySelectorAll(`*[id=category-list-div-${divId + "-" +selectedRecommendation.ID}]`);
                  const actionsDiv =document.querySelectorAll(`*[id=recommendation-actions-${divId + "-" +selectedRecommendation.ID}]`);
                  for (var i = 0; i < categoryDiv.length; i++) {
                    categoryDiv.item(i).classList.remove("col-md-6", "col-lg-9");
                    categoryDiv.item(i).classList.add("col-md-12");
        
                  }
                  for (var i = 0; i < actionsDiv.length; i++) {
                    actionsDiv.item(i).style.display="none";
                    actionsDiv.item(i).style.opacity=0;
                    actionsDiv.item(i).style.visibility="hidden";
                    }
        
                    let alliesList = [];
                    selectedRecommendation?.Recommendation_Engine_Ally?.length
                      ? selectedRecommendation?.Recommendation_Engine_Ally?.map(
                          (ally) => {
                            const recommendationAllyConfig = {
                              appName: "customer-portal",
                              reportName: "All_Recommendation_Engine_Allies",
                              id: ally.ID,
                            };
        
                            //get specific record API
                            ZOHO.CREATOR.API.getRecordById(
                              recommendationAllyConfig
                            ).then(function (response) {
                              if (response?.data) {
                                alliesList.push(response.data);
                                const sortedArray = _.sortBy(
                                  alliesList,
                                  "Priority"
                                ).reverse();
                                alliesList = sortedArray;
                                const list = alliesList.map((allyItem) => {
                                  return `
                                  <div class="row g-1" >
                                    <div class="col-md-9 border-line" style="border-right: 4px solid #fff; width:74% !important">
                                      <div class="customer-details">
                                        <img class="company-icon" src=${
                                          `assets/Priority-` +
                                          allyItem?.Priority +
                                          `.png`
                                        } alt="title">
                                        <div class="customer-desc">
                                          <h3 class="customer-name">${
                                            ally?.display_value || ""
                                          }</h3>
                                          ${allyItem?.Description || ""}
                                        </div>
                                      </div>
                                      ${
                                        allyItem?.Call_to_Action?.length
                                          ? allyItem?.Call_to_Action?.map((action) => {
                                              return `<button class="primary-btn mb-2 mt-3" id="action-btn" vector-id=${selectedRecommendation?.Reptile_Index_Theory_Attack_Vector?.ID} name=${action.split(' ').join('-')}>${action}</button>`;
                                            }).join(" ")
                                          : ""
                                      }
                                    </div>
                                    <div class="col-md-3" style="width:26% !important">
                                      <div class="container-fluid" style="height:100%">
                                        <div class="row g-1" style="height:100%">
                                          <div class="col-md-4 col-lg-4 border-line" style="border-right: 4px solid #fff">
                                            <div class="p-3 bg-light border-top-bottom align-center mt-5" style="position:relative">
                                              ${
                                                allyItem?.Product === "true"
                                                  ? `<img src="assets/cart.png" alt="" />`
                                                  : ""
                                              }
                                            </div>
                                          </div>
                                          <div class="col-md-4 col-lg-4 border-line" style="border-right: 4px solid #fff;position:relative" >
                                            <div class="p-3 bg-light align-center service-line mt-5" style="position:relative">
                                              ${
                                                allyItem?.Service === "true"
                                                  ? `<img src="assets/service.png" alt="" />`
                                                  : ""
                                              }
                                            </div>
                                          </div>
                                          <div class="col-md-4 col-lg-4" style="position:relative">
                                            <div class="p-3 bg-light align-center manage-line mt-5" style="position:relative">
                                              ${
                                                allyItem?.Manage === "true"
                                                  ? `<img src="assets/manage.png" alt="" />`
                                                  : ""
                                              }
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                    `;
                                }).join(" ");
                                alliesDiv.innerHTML = list;
                              }
                            });
                          }
                        )
                      : null;
                }
              
              } else {
                btn.innerText = "VIEW DETAIL";
                if (alliesDiv !== null) {
                  alliesDiv.style.display = "none";
                  alliesDiv.style.opacity = 0;
                  alliesDiv.style.visibility = "hidden";
                } if (detailDiv !== null) {
                  detailDiv.style.display = "none";
                  detailDiv.style.opacity = 0;
                  detailDiv.style.visibility = "hidden";
                }
                const categoryDiv =document.querySelectorAll(`*[id=category-list-div-${divId + "-" +selectedRecommendation.ID}]`);
                const actionsDiv =document.querySelectorAll(`*[id=recommendation-actions-${divId + "-" +selectedRecommendation.ID}]`);
                for (var i = 0; i < categoryDiv.length; i++) {
                  categoryDiv.item(i).classList.add("col-md-6", "col-lg-9");
                  categoryDiv.item(i).classList.remove("col-md-12");
        
                }
                for (var i = 0; i < actionsDiv.length; i++) {
                  actionsDiv.item(i).style.display = "block";
                  actionsDiv.item(i).style.opacity = 1;
                  actionsDiv.item(i).style.visibility = "visible";
                }
                
              }
            }
            if(btnId === "action-btn"){
              const name = e.target.getAttribute("name");
              const vectorId = e.target.getAttribute("vector-id");
              if(name.split("-").join(" ") === "View Products"){
                window.open( getDomain() + `/bluewire/customer-portal/#Page:Resources_S?loginUserEmail=`+queryParams["loginUserEmail"]+`&selectedAttackVectorID=`+ vectorId, "_parent")
              } else if(name.split("-").join(" ") === "Manage Accounts"){
                window.open(getDomain() + `/bluewire/customer-portal/#Page:Account_Connection_Status?loginUserEmail=`+queryParams["loginUserEmail"], "_parent")
              }else if(name.split("-").join(" ") === "Engage an Expert"){
                window.open(getDomain() + `/bluewire/customer-portal/#Page:Resources_S?loginUserEmail=`+queryParams["loginUserEmail"] + `&tagName=Engage an Expert`, "_parent")
              
              }else if(name.split("-").join(" ") === "Hire a Consultant"){
                window.open(getDomain() + `/bluewire/customer-portal/#Page:Resources_S?loginUserEmail=`+queryParams["loginUserEmail"] + `&tagName=Hire a Consultant`, "_parent")
              }
            }
          });
        });
    });
}