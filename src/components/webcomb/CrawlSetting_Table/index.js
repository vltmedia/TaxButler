import './style.css';
import React from 'react';
import ReactTable from '../../SimpleTable/react-table';

class CrawlSetting_Table extends React.Component {
  get initialData() {
    return [
      {
        id: '99999',
        link: 'google.com',
        shipping_type: 'Ship',
        amount: 1,
        status: 0,
        vendor: 2,
        desciption: 'Google check'
      },
      {
        id: '7786',
        link: 'yahoo.com',
        shipping_type: 'Ship',
        amount: 1,
        status: 0,
        vendor: 1,
        desciption: 'Yahoo membership'
      },
      {
        id: '97979',
        link: 'tata.com',
        shipping_type: 'Pickup',
        amount: 3,
        status: 1,
        vendor: 1,
        desciption: 'Bras'
      },
      {
        id: '5838',
        link: 'get.com',
        shipping_type: 'Pickup',
        amount: 15,
        status: 0,
        vendor: 2,
        desciption: 'Check get ping'
      }
    ];
  }

  get nextData() {
    return [
      {
        id: '99999',
        link: 'google.com',
        shipping_type: 'Ship',
        amount: 1,
        status: 0,
        vendor: 2,
        desciption: 'Google check'
      },
      {
        id: '7786',
        link: 'yahoo.com',
        shipping_type: 'Ship',
        amount: 1,
        status: 0,
        vendor: 1,
        desciption: 'Yahoo membership'
      },
      {
        id: '97979',
        link: 'tata.com',
        shipping_type: 'Pickup',
        amount: 3,
        status: 1,
        vendor: 1,
        desciption: 'Bras'
      },
      {
        id: '5838',
        link: 'get.com',
        shipping_type: 'Pickup',
        amount: 15,
        status: 0,
        vendor: 2,
        desciption: 'Check get ping'
      }
    ];
  }

  columns() {
    return [
      {
        name: 'Edit',
        accessor: function(row) {
          return (
            <p
              onClick={() => {
                this.props.rowClicked(row);
              }}
              className="reactTableLink_CrawlSetting"
            >
              Edit
            </p>
          );
        }
      },
      {
        name: 'id',
        accessor: 'id'
      },
      {
        name: 'Link',
        accessor: function(row) {
          return (
            <a
              className="reactTableLink_CrawlSetting"
              href={row.link}
              target="_blank"
            >
              {row.link}
            </a>
          );
        }
      },
      {
        name: 'Shipping Type',
        accessor: 'shipping_type'
      },
      {
        name: 'Amount',
        accessor: 'amount'
      },
      {
        name: 'Status',
        accessor: 'status'
      },

      {
        name: 'Vendor',
        accessor: function(row) {
          if (row.vendor == 1) {
            return 'Target';
          }
          if (row.vendor == 2) {
            return 'Walmart';
          }
          if (row.vendor == 3) {
            return 'Panini American';
          } else {
            return 'N/A';
          }
        }
      },
      {
        name: 'desciption',
        accessor: 'desciption'
      }
    ];
  }

  //   get columns() {
  //     return [
  //       {
  //         name: 'Edit',
  //         accessor: function(row) {
  //           return (
  //             <p
  //               onClick={() => {
  //                 this.props.rowClicked(row);
  //               }}
  //               className="reactTableLink_CrawlSetting"
  //             >
  //               Edit
  //             </p>
  //           );
  //         }
  //       },
  //       {
  //         name: 'id',
  //         accessor: 'id'
  //       },
  //       {
  //         name: 'Link',
  //         accessor: function(row) {
  //           return (
  //             <a
  //               className="reactTableLink_CrawlSetting"
  //               href={row.link}
  //               target="_blank"
  //             >
  //               {row.link}
  //             </a>
  //           );
  //         }
  //       },
  //       {
  //         name: 'Shipping Type',
  //         accessor: 'shipping_type'
  //       },
  //       {
  //         name: 'Amount',
  //         accessor: 'amount'
  //       },
  //       {
  //         name: 'Status',
  //         accessor: 'status'
  //       },

  //       {
  //         name: 'Vendor',
  //         accessor: function(row) {
  //           if (row.vendor == 1) {
  //             return 'Target';
  //           }
  //           if (row.vendor == 2) {
  //             return 'Walmart';
  //           }
  //           if (row.vendor == 3) {
  //             return 'Panini American';
  //           } else {
  //             return 'N/A';
  //           }
  //         }
  //       },
  //       {
  //         name: 'desciption',
  //         accessor: 'desciption'
  //       }
  //     ];
  //   }

  constructor(props) {
    super(props);
    this.state = {};
    this.state.data = this.initialData;
    this.state.columns = [
     
      {
        name: 'id',
        accessor: 'id'
      },
      {
        name: 'Edit',
        accessor: function(row) {
          return (
            <p
              onClick={() => {
        
                props.rowClicked(row);
              }}
              className="reactTableLink_CrawlSetting"
            >
              Edit
            </p>
          );
        }
      },
      {
        name: 'Link',
        accessor: function(row) {
          return (
            <a
              className="reactTableLink_CrawlSetting"
              href={row.link}
              target="_blank"
            >
              {row.link}
            </a>
          );
        }
      },
      {
        name: 'Shipping Type',
        accessor: 'shipping_type'
      },
      {
        name: 'Amount',
        accessor: 'amount'
      },
      {
        name: 'Status',
        accessor: 'status'
      },

      {
        name: 'Vendor',
        accessor: function(row) {
          if (row.vendor == 1) {
            return 'Target';
          }
          if (row.vendor == 2) {
            return 'Walmart';
          }
          if (row.vendor == 3) {
            return 'Panini American';
          } else {
            return 'N/A';
          }
        }
      },
      {
        name: 'desciption',
        accessor: 'desciption'
      }
    ];
    // this.state.columns = this.columns;
    // this.columns = this.columns.bind(this);
  }
  componentDidMount() {
    console.log(this.props.data);
  }
  handlePageChange(oldPage, lastObject, newPage) {
    switch (newPage) {
      case 1:
        this.setState({ data: this.initialData });
        break;
      case 2:
        this.setState({ data: this.nextData });
        break;
      default:
        this.setState({ data: this.initialData });
    }
  }

  handleFilter(filterInput) {
    if (filterInput.trim() === '') {
      this.setState({ data: this.initialData });
    } else {
      let filteredData = [];

      this.initialData.forEach(element => {
        if (element.house === filterInput) {
          filteredData.push(element);
        }
      });

      this.nextData.forEach(element => {
        if (element.house === filterInput) {
          filteredData.push(element);
        }
      });

      this.setState({ data: filteredData });
    }
  }

  render() {
    return (
      <ReactTable
        data={this.props.data}
        // data={this.state.data}
        columns={this.state.columns}
        onPageChange={this.handlePageChange.bind(this)}
        onFilter={this.handleFilter.bind(this)}
      />
    );
  }
}
export default CrawlSetting_Table;

// ReactDOM.render(
//     <ReactTableExample />,
//     document.getElementById('react-container')
// );
