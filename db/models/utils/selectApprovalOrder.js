//  list of people who are set a approvers depending on business logic

const costCenters = {
  '10200': {
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
  '10201': {
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
  '10202': {
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
  '10203': {
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
  '10204': {
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
  '10205': {
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
  '10206': {
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
  '10207': {
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
  '10208': {
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
  '10209': {
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
  '10210': {
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
  '10211': {
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
  '10212': {
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
  '10213': {
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
};

function selectApprovalOrder(context) {
  let approvalRoute = 'approverOne';
  const { invoiceTotal, costCenter } = context;

  if(invoiceTotal > 1000) approvalRoute = 'approverTwo'
  if(invoiceTotal > 2500) approvalRoute = 'approverThree'

  return costCenters[costCenter].routes[approvalRoute] || [{ email: 'Aqil@pmcoc.com', isApproved: false, isSent: false }]
}

module.exports = selectApprovalOrder;
