import {
  MdLanguage,
  MdLightbulbOutline,
  MdMailOutline,
  MdPlayCircleOutline,
  MdRadio,
  MdSnooze,
  MdThumbsUpDown,
  MdThumbUp,
} from 'react-icons/md';

export const iconD3Data = [
  {
    bgColor: 'primary',
    icon: MdThumbUp,
    title: 'Primary',
    subtitle: 'widget subtitle',
  },
  {
    bgColor: 'secondary',
    icon: MdThumbsUpDown,
    title: 'Secondary',
    subtitle: 'widget subtitle',
  },
  {
    bgColor: 'success',
    icon: MdLanguage,
    title: 'Success',
    subtitle: 'widget subtitle',
  },
  {
    bgColor: 'danger',
    icon: MdLightbulbOutline,
    title: 'Danger',
    subtitle: 'widget subtitle',
  },
  {
    bgColor: 'warning',
    icon: MdPlayCircleOutline,
    title: 'Warning',
    subtitle: 'widget subtitle',
  },
  {
    bgColor: 'info',
    icon: MdRadio,
    title: 'Info',
    subtitle: 'widget subtitle',
  },
  {
    bgColor: 'light',
    icon: MdSnooze,
    title: 'Light',
    subtitle: 'widget subtitle',
    inverse: false,
  },
  {
    bgColor: 'dark',
    icon: MdMailOutline,
    title: 'Dark',
    subtitle: 'widget subtitle',
  },
];

export const numberD3Data = [
  { color: 'primary' },
  { color: 'secondary' },
  { color: 'success' },
  { color: 'info' },
  { color: 'warning' },
  { color: 'danger' },
  { color: 'light' },
  { color: 'dark' },
];

export const treeData = [
  {
    name: 'Top Level',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C',
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];
