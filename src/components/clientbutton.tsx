// components/ClientButton.tsx
'use client';

export default function ClientButton() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Do something</button>;
}
