
/*
const roleTypes = [
  'User',
  'Admin',
  'Accounting',
  'PRCreator',
  'Buyer',
  'Manager',
];
*/

const PRCreatorApps = {
  purchasing: [
    {
      title: 'Create New Purchase Requisition',
      subtitle: 'Submit new purchase request to follow approval workflows.',
      link: '/createform',
    },
    {
      title: 'My Pending PRs',
      subtitle: 'View outstanding requests and their statuses.',
      link: '/viewforms',
    },
  ],

  vendors: [
    {
      title: 'Add Vendors',
      subtitle: 'Add new vendors',
      link: '/add',
    },
  ]
}


const BuyerApps = {
  purchasing: [
    ...PRCreatorApps.purchasing,
    {
      title: 'All PRs',
      subtitle: 'View details of all the PRs submitted company wide.',
      link: '/viewallrequests',
    },
  ],

  vendors: [
    ...PRCreatorApps.vendors,
  ],

  purchaseOrders: [
    {
      title: 'All POs',
      subtitle: 'View details of all the POs submitted company wide.',
      link: '/allpos',
    },
    {
      title: 'Create New PO',
      subtitle: 'Create a new PO for an approved PR',
      link: '/createpo',
    }
  ]
}

const AccountingApps = {
  purchasing: [
    ...BuyerApps.purchasing,
  ],
  purchaseOrders: [
    {
      title: 'All POs',
      subtitle: 'View details of all the POs submitted company wide.',
      link: '/allpos',
    },
  ],
}

const AdminApps = {
  users: [
    {
      title: 'User Management',
      subtitle: 'Manage purchase requisition requests here',
      link: '/users',
    }
  ],

  vendors: [
    ...PRCreatorApps.vendors,
    {
      title: 'View All Vendors',
      subtitle: 'View a list of all vendors',
      link: '/viewall',
    },
  ],

  purchasing: [
    ...BuyerApps.purchasing,
  ],

  purchaseOrders: [
    ...BuyerApps.purchaseOrders,
  ],
}

export const userPermissions = {
  User: {
    purchasing: [],
  },

  PRCreator: {...PRCreatorApps},
  Buyer: {...BuyerApps},
  Accounting: {...AccountingApps},
  Admin: {...AdminApps},
};
