'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const { i18n, t } = useTranslation('common');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇪🇬' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = async (locale) => {
    // Update user preference if logged in
    if (session?.user?.id) {
      try {
        await fetch(`/api/users/${session.user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ preferredLanguage: locale }),
        });
      } catch (error) {
        console.error('Failed to update language preference:', error);
      }
    }

    // Change the language
    await i18n.changeLanguage(locale);
    
    // Reload the current page with the new locale
    router.push(pathname);
  };

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="flex items-center text-sm rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span className="sr-only">{t('changeLanguage')}</span>
          <div className="flex items-center">
            <span className="mr-1 text-gray-400">{currentLanguage.flag}</span>
            <span className="hidden md:inline text-gray-400">{currentLanguage.code.toUpperCase()}</span>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {languages.map((language) => (
            <Menu.Item key={language.code}>
              {({ active }) => (
                <button
                  onClick={() => changeLanguage(language.code)}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } ${
                    currentLanguage.code === language.code ? 'font-medium' : ''
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSwitcher;