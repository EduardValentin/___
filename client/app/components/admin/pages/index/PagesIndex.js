import React, { Component } from 'react'
import LoadingSpinner from 'lib/components/LoadingSpinner';
import ActionBar from 'components/admin/shared/ActionBar';

export default class PagesIndex extends Component {
  render() {
    const {
      pages,
    } = this.props;

    console.log(pages);

    if (pages.loading) {
      return <LoadingSpinner />
    }

    console.log(pages);

    return (
      <div className="pages-index">
        <ActionBar
          title="Pages"
          buttons={[
            {
              type: 'link',
              link: '/admin/pages/new',
              text: 'New page',
              bootstrapColor: 'primary',
            }
          ]}
        />

        <div>
          {pages.data.map(page => {
            return (
              <div className="page-row">
                <div>
                  <div>{page.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}
