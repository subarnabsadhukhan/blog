/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';

import { Preferences, Publication, PublicationNavbarItem, User } from '../generated/graphql';
import { BarsSVG } from './icons/svgs';
import CommonHeaderIconBtn from './common-header-icon-btn';

const PublicationSidebar = dynamic(() => import('./publication-sidebar'), {
  ssr: false,
});

interface Props {
  isUserThemeDark: boolean;
  publication: Pick<Publication, 'id' | 'title' | 'url' | 'isTeam' | 'headerColor' | 'favicon' | 'links'> & {
    author: Pick<User, 'id' | 'username' | 'name' | 'profilePicture'>;
  } & {
    preferences: Omit<Preferences, 'navbarItems'> & {
      navbarItems: Array<Omit<PublicationNavbarItem, 'series'>>;
    };
  };
}

const LeftSidebarButton = (props: Props) => {
  const { isUserThemeDark, publication } = props;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isSidebarVisible, toggleSidebarVisibility] = useState(false);

  const toggleSidebar = () => {
    toggleSidebarVisibility(!isSidebarVisible);
  };

  return (
    <>
      {isSidebarVisible ? (
        <PublicationSidebar publication={publication} toggleSidebar={toggleSidebar} triggerRef={triggerRef} />
      ) : null}
      <CommonHeaderIconBtn
        isUserThemeDark={isUserThemeDark}
        headerColor={publication.headerColor}
        handleClick={toggleSidebar}
        variant="leftSidebar"
        btnRef={triggerRef}
      >
        <BarsSVG className="h-6 w-6 stroke-current" />
      </CommonHeaderIconBtn>
    </>
  );
};

export default LeftSidebarButton;
