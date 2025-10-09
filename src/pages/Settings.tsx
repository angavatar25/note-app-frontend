import React, { useState } from 'react';
import { ArrowLeft, Moon, Sun, LogOut, ChevronRight } from 'lucide-react';
import { Logout } from '../api/auth';
import useNavigation from '../hooks/useNavigate';
import { useGetUserData } from '../hooks/useUser';
import useTheme from '../hooks/useTheme';

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const { redirectTo } = useNavigation();

  const { data, isLoading } = useGetUserData();

  const handleLogout = () => {
    Logout();
    window.location.href = '/login';
  };

  const handleBack = () => {
    redirectTo('/');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}  items-center justify-center flex flex-col h-screen`}>
      <div className="w-full max-w-[500px] max-h-[800px] m-auto relative">
        {/* iPhone-like frame */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden min-h-[800px] relative`}>
          {/* Header */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-6 pt-4 pb-6`}>
            <button 
              onClick={handleBack}
              className={`${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'} p-2 rounded-full transition-colors mb-4`}
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          </div>

          {/* User Profile Section */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-6`}>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              {isLoading ? (
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {data?.userData.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              {/* User Info */}
              <div className="flex-1">
                {isLoading ? (
                  <>
                    <div className="mb-2 overflow-hidden">
                      <div className={`h-6 w-40 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-md relative overflow-hidden`}>
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'} animate-shimmer`}></div>
                      </div>
                    </div>
                    {/* Skeleton for Email */}
                    <div className="overflow-hidden">
                      <div className={`h-4 w-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-md relative overflow-hidden`}>
                        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'} animate-shimmer`}></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {data?.userData.name}
                    </h2>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {data?.userData.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className={`h-px ${isDarkMode ? 'bg-gradient-to-r from-transparent via-gray-600 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-300 to-transparent'}`}></div>
          </div>

          {/* Settings Menu */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-6 pb-24`}>
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between py-4 px-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-xl transition-colors group`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center ${isDarkMode ? 'text-yellow-400' : 'text-gray-700'}`}>
                  {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <div className="text-left">
                  <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    App Theme
                  </span>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isDarkMode ? 'Dark mode' : 'Light mode'}
                  </p>
                </div>
              </div>
              <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} group-hover:text-gray-600`}>
                <div className={`w-12 h-6 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'} rounded-full p-1 transition-colors relative`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-between py-4 px-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} rounded-xl transition-colors group mt-2`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center ${isDarkMode ? 'text-red-400' : 'text-gray-700'}`}>
                  <LogOut size={20} />
                </div>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Logout
                </span>
              </div>
              <ChevronRight 
                size={20} 
                className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} group-hover:text-gray-600 transition-colors`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;