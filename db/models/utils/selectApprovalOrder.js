//  list of people who are set a approvers depending on business logic

const costCenters = [
  {
    id: 10200,
    routes: {
      approverOne: [
        { email: 'jim@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'jim@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'jim@pmcoc.com', isApproved: false, isSent: false },
        { email: 'jay@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10201,
    routes: {
      approverOne: [
        { email: 'sergio@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'sergio@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'sergio@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10202,
    routes: {
      approverOne: [
        { email: 'bob@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'bob@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'bob@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10203,
    routes: {
      approverOne: [
        { email: 'kerry@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'kerry@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'kerry@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10204,
    routes: {
      approverOne: [
        { email: 'amy@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'amy@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'amy@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10205,
    routes: {
      approverOne: [
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10206,
    routes: {
      approverOne: [
        { email: 'bala@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'bala@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'bala@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10207,
    routes: {
      approverOne: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10208,
    routes: {
      approverOne: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10209,
    routes: {
      approverOne: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10210,
    routes: {
      approverOne: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10211,
    routes: {
      approverOne: [
        { email: 'lreth@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'lreth@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'lreth@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10212,
    routes: {
      approverOne: [
        { email: 'lreth@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'lreth@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'lreth@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
        { email: 'fkav@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
  {
    id: 10213,
    routes: {
      approverOne: [
        { email: 'jay@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverTwo: [
        { email: 'jay@pmcoc.com', isApproved: false, isSent: false },
      ],
      approverThree: [
        { email: 'jay@pmcoc.com', isApproved: false, isSent: false },
        { email: 'larena@pmcoc.com', isApproved: false, isSent: false },
      ],
    }
  },
];

const approvalOrderList = {
  cSuite: ['aqilt@mac.com', 'aqilthanawala@gmail.com'],
  'New Patriot Holdings': ['aqil@pmcoc.com'],
  'Hero Oak': ['aqil@pmcoc.com', 'aqilt@mac.com', 'aqilthanawala@gmail.com']
};

function selectApprovalOrder(context) {
  if (context.invoiceTotal >= 10000) return approvalOrderList.cSuite;
  const { entity } = context
  return approvalOrderList[entity];
}

module.exports = selectApprovalOrder;
