//  list of people who are set a approvers depending on business logic

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
