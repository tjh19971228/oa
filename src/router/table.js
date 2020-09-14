[
  {
    path: "/index",
    name: "index"
  },
  {
    path: "/project",
    name: "project",
    children: [
      {
        path: "/project/myProject",
        name: "myproject"
      },
      {
        path: "/project/allProject",
        name: "allProject"
      }
    ]
  },
  {
    path: "/customer",
    name: "customer",
    children: [
      {
        path: "/customer/myCustomer",
        name: "myCustomer"
      },
      {
        path: "/customer/customerPublic",
        name: "customerPublic"
      },
      {
        path: "/customer/allCustomer",
        name: "allCustomer"
      }
    ]
  },
  {
    path: "/talent",
    name: "talent",
    children: [
      { path: "/talent/talentPool", name: "talentPool" },
      { path: "/talent/talentPublic", name: "talentPublic" },
      { path: "/talent/allTalent", name: "allTalent" }
    ]
  },
  {
      path:"/message",
      name:"message",
      children:[{
          path:"/message/myMessage",
          name:"myMessage"
      },{
          path:"/message/notification",
          name:"notification"
      }]
  },{
      path:"/EHR",
      name:"EHR",
      children:[{
          path:"/EHR/contractManagement",
          name:"contractManagement"
      },{
          path:"/EHR/companyPolicy",
          name:"companyPolicy"
      },{
          path:"/EHR/leaveManagement",
          name:"leaveManagement"
      },{
          path:"/EHR/attendanceManagement",
          name:"attendanceManagement"
      },{
          path:"/EHR/invoiceManagement",
          name:"invoiceManagement"
      }]
  },{
      path:"/personal",
      name:"personal",
      children:[{
          path:"/personal/infoManagement",
          name:"infoManagement"
      },{
          path:"/personal/leaveApply",
          name:'leaveApply'
      },{
          path:"/personal/myAttendence",
          name:"myAttendence"
      },{
          path:"/personal/invoiceApply",
          name:"invoiceApply"
      }]
  },{
      path:"/system",
      name:"system",
      children:[{
          path:"/system/userManagement",
          name:"userManagement"
      },{
          path:"/system/authorityManagement",
          name:"authorityManagement"
      },{
          path:"/system/roleManagement",
          name:"roleManagement"
      },{
          path:"/system/organizationManagement",
          name:"organizationManagement"
      },{
          path:'/system/menuManagement',
          name:'menuManagement'
      },{
          path:"/system/dictionaryManagement",
          name:"dictionaryManagement"
      }]
  }
];
