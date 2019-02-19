import React from 'react';

interface HeaderProps {
  tagline: string;
}

export default function Header(props: HeaderProps) {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">Of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  );
}
