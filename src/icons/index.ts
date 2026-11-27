/*
 * 站点图标集 —— 由 scripts/gen-icons.mjs 生成，请勿手改。
 *
 * 全部是 Material Symbols 的官方路径，编译成内联 SVG 函数式组件。
 * m3-ui 的组件接收任意渲染 <svg> 的 Vue 组件，所以这里不需要图标库运行时。
 */
import { h, type FunctionalComponent } from 'vue'

function svg(body: string, name: string, width: number, height: number): FunctionalComponent {
  const component: FunctionalComponent = () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: `0 0 ${width} ${height}`,
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        'aria-hidden': 'true',
        focusable: 'false',
        innerHTML: body,
      },
    )
  component.displayName = name
  return component
}

/** Material Symbols: menu */
export const IconMenu = svg('<path fill="currentColor" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"/>', 'IconMenu', 24, 24)

/** Material Symbols: close */
export const IconClose = svg('<path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/>', 'IconClose', 24, 24)

/** Material Symbols: light-mode */
export const IconLightMode = svg('<path fill="currentColor" d="M8.463 15.538Q7 14.075 7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17t-3.537-1.463M5 13H1v-2h4zm18 0h-4v-2h4zM11 5V1h2v4zm0 18v-4h2v4zM6.4 7.75L3.875 5.325L5.3 3.85l2.4 2.5zm12.3 12.4l-2.425-2.525L17.6 16.25l2.525 2.425zM16.25 6.4l2.425-2.525L20.15 5.3l-2.5 2.4zM3.85 18.7l2.525-2.425L7.75 17.6l-2.425 2.525z"/>', 'IconLightMode', 24, 24)

/** Material Symbols: dark-mode */
export const IconDarkMode = svg('<path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21"/>', 'IconDarkMode', 24, 24)

/** Material Symbols: arrow-upward */
export const IconArrowUp = svg('<path fill="currentColor" d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"/>', 'IconArrowUp', 24, 24)

/** Material Symbols: arrow-forward */
export const IconArrowForward = svg('<path fill="currentColor" d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4z"/>', 'IconArrowForward', 24, 24)

/** Material Symbols: open-in-new */
export const IconOpenInNew = svg('<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"/>', 'IconOpenInNew', 24, 24)

/** Material Symbols: groups */
export const IconGroups = svg('<path fill="currentColor" d="M0 18v-1.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0v-1.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V18zm13.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"/>', 'IconGroups', 24, 24)

/** Material Symbols: person */
export const IconPerson = svg('<path fill="currentColor" d="M9.175 10.825Q8 9.65 8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12t-2.825-1.175M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/>', 'IconPerson', 24, 24)

/** Material Symbols: verified */
export const IconVerified = svg('<path fill="currentColor" d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12z"/>', 'IconVerified', 24, 24)

/** Material Symbols: dns */
export const IconServer = svg('<path fill="currentColor" d="M7.5 6q-.625 0-1.062.438T6 7.5t.438 1.063T7.5 9t1.063-.437T9 7.5t-.437-1.062T7.5 6m0 10q-.625 0-1.062.438T6 17.5t.438 1.063T7.5 19t1.063-.437T9 17.5t-.437-1.062T7.5 16M4 3h16q.425 0 .713.288T21 4v7q0 .425-.288.713T20 12H4q-.425 0-.712-.288T3 11V4q0-.425.288-.712T4 3m0 10h16q.425 0 .713.288T21 14v7q0 .425-.288.713T20 22H4q-.425 0-.712-.288T3 21v-7q0-.425.288-.712T4 13"/>', 'IconServer', 24, 24)

/** Material Symbols: rocket-launch */
export const IconRocket = svg('<path fill="currentColor" d="m2.45 10.575l4.2-4.2q.35-.35.825-.5t.975-.05l1.3.275Q8.4 7.7 7.625 9t-1.5 3.15zm5.125 2.275q.575-1.8 1.563-3.4t2.387-3q2.2-2.2 5.025-3.287t5.275-.663q.425 2.45-.65 5.275T17.9 12.8q-1.375 1.375-3 2.388t-3.425 1.587zm8.313-2.425q.837 0 1.412-.575t.575-1.412t-.575-1.413t-1.412-.575t-1.413.575t-.575 1.413t.575 1.412t1.413.575m-2.113 11.45l-1.6-3.675q1.85-.725 3.163-1.5t2.912-2.125l.25 1.3q.1.5-.05.988t-.5.837zM4.05 16.05q.875-.875 2.125-.888t2.125.863t.875 2.125t-.875 2.125q-.625.625-2.088 1.075t-4.037.8q.35-2.575.8-4.025T4.05 16.05"/>', 'IconRocket', 24, 24)

/** Material Symbols: layers */
export const IconLayers = svg('<path fill="currentColor" d="m12 21.05l-9-7l1.65-1.25L12 18.5l7.35-5.7L21 14.05zM12 16L3 9l9-7l9 7z"/>', 'IconLayers', 24, 24)

/** Material Symbols: settings */
export const IconSettings = svg('<path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/>', 'IconSettings', 24, 24)

/** Material Symbols: smartphone */
export const IconSmartphone = svg('<path fill="currentColor" d="M7 23q-.825 0-1.412-.587T5 21V3q0-.825.588-1.412T7 1h10q.825 0 1.413.588T19 3v3.1q.45.175.725.55T20 7.5v2q0 .475-.275.85T19 10.9V21q0 .825-.587 1.413T17 23zm5.713-17.287Q13 5.424 13 5t-.288-.712T12 4t-.712.288T11 5t.288.713T12 6t.713-.288"/>', 'IconSmartphone', 24, 24)

/** Material Symbols: business-center */
export const IconBusiness = svg('<path fill="currentColor" d="M4 21q-.825 0-1.412-.587T2 19v-4h7v2h6v-2h7v4q0 .825-.587 1.413T20 21zm7-6v-2h2v2zm-9-2V8q0-.825.588-1.412T4 6h4V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v2h4q.825 0 1.413.588T22 8v5h-7v-2H9v2zm8-7h4V4h-4z"/>', 'IconBusiness', 24, 24)

/** Material Symbols: edit */
export const IconEdit = svg('<path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/>', 'IconEdit', 24, 24)

/** Material Symbols: movie */
export const IconMovie = svg('<path fill="currentColor" d="m4 4l2 4h3L7 4h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4"/>', 'IconMovie', 24, 24)

/** Material Symbols: play-arrow */
export const IconPlay = svg('<path fill="currentColor" d="M8 19V5l11 7z"/>', 'IconPlay', 24, 24)

/** Material Symbols: download */
export const IconDownload = svg('<path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>', 'IconDownload', 24, 24)

/** Material Symbols: thumb-up */
export const IconThumbUp = svg('<path fill="currentColor" d="M18 21H8V8l7-7l1.25 1.25q.175.175.288.475t.112.575v.35L15.55 8H21q.8 0 1.4.6T23 10v2q0 .175-.037.375t-.113.375l-3 7.05q-.225.5-.75.85T18 21M6 8v13H2V8z"/>', 'IconThumbUp', 24, 24)

/** Material Symbols: sentiment-satisfied */
export const IconSmile = svg('<path fill="currentColor" d="M15.5 11q.625 0 1.063-.437T17 9.5t-.437-1.062T15.5 8t-1.062.438T14 9.5t.438 1.063T15.5 11m-7 0q.625 0 1.063-.437T10 9.5t-.437-1.062T8.5 8t-1.062.438T7 9.5t.438 1.063T8.5 11m6.588 5.538Q16.475 15.575 17.1 14h-1.65q-.55.925-1.462 1.463T12 16t-1.987-.537T8.55 14H6.9q.625 1.575 2.013 2.538T12 17.5t3.088-.962M8.1 21.213q-1.825-.788-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22t-3.9-.788"/>', 'IconSmile', 24, 24)

/** Material Symbols: forum */
export const IconChat = svg('<path fill="currentColor" d="M7 18q-.425 0-.712-.288T6 17v-2h13V6h2q.425 0 .713.288T22 7v15l-4-4zm-5-1V3q0-.425.288-.712T3 2h13q.425 0 .713.288T17 3v9q0 .425-.288.713T16 13H6z"/>', 'IconChat', 24, 24)

/** Material Symbols: mail */
export const IconMail = svg('<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>', 'IconMail', 24, 24)

/** Material Symbols: language */
export const IconLanguage = svg('<path fill="currentColor" d="M8.125 21.213q-1.825-.788-3.187-2.15t-2.15-3.188T2 11.988t.788-3.875t2.15-3.175t3.187-2.15T12.013 2t3.875.788t3.175 2.15t2.15 3.175t.787 3.875t-.787 3.887t-2.15 3.188t-3.175 2.15t-3.875.787t-3.888-.787M12 19.95q.65-.9 1.125-1.875T13.9 16h-3.8q.3 1.1.775 2.075T12 19.95m-2.6-.4q-.45-.825-.787-1.713T8.05 16H5.1q.725 1.25 1.813 2.175T9.4 19.55m5.2 0q1.4-.45 2.488-1.375T18.9 16h-2.95q-.225.95-.562 1.838T14.6 19.55M4.25 14h3.4q-.075-.5-.112-.987T7.5 12t.038-1.012T7.65 10h-3.4q-.125.5-.187.988T4 12t.063 1.013t.187.987m5.4 0h4.7q.075-.5.113-.987T14.5 12t-.038-1.012T14.35 10h-4.7q-.075.5-.112.988T9.5 12t.038 1.013t.112.987m6.7 0h3.4q.125-.5.188-.987T20 12t-.062-1.012T19.75 10h-3.4q.075.5.113.988T16.5 12t-.038 1.013t-.112.987m-.4-6h2.95q-.725-1.25-1.812-2.175T14.6 4.45q.45.825.788 1.713T15.95 8M10.1 8h3.8q-.3-1.1-.775-2.075T12 4.05q-.65.9-1.125 1.875T10.1 8m-5 0h2.95q.225-.95.563-1.838T9.4 4.45Q8 4.9 6.912 5.825T5.1 8"/>', 'IconLanguage', 24, 24)

/** Material Symbols: photo-library */
export const IconPhoto = svg('<path fill="currentColor" d="M9 14h10l-3.45-4.5l-2.3 3l-1.55-2zm-1 4q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm-4 4q-.825 0-1.412-.587T2 20V6h2v14h14v2z"/>', 'IconPhoto', 24, 24)

/** Material Symbols: campaign */
export const IconCampaign = svg('<path fill="currentColor" d="M18 13v-2h4v2zm1.2 7L16 17.6l1.2-1.6l3.2 2.4zm-2-12L16 6.4L19.2 4l1.2 1.6zM5 19v-4H4q-.825 0-1.412-.587T2 13v-2q0-.825.588-1.412T4 9h4l5-3v12l-5-3H7v4zm9-3.65v-6.7q.675.6 1.088 1.463T15.5 12t-.413 1.888T14 15.35"/>', 'IconCampaign', 24, 24)

/** Material Symbols: favorite */
export const IconFavorite = svg('<path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"/>', 'IconFavorite', 24, 24)

/** Material Symbols: shield-person */
export const IconShield = svg('<path fill="currentColor" d="M14.475 11.975Q15.5 10.95 15.5 9.5t-1.025-2.475T12 6T9.525 7.025T8.5 9.5t1.025 2.475T12 13t2.475-1.025M12 22q-3.65-.925-5.825-4T4 11.1V5l8-3l8 3v6.1q0 3.825-2.175 6.9T12 22m0-2.1q1.475-.475 2.613-1.487t1.987-2.288q-1.075-.55-2.238-.837T12 15t-2.363.288t-2.237.837q.85 1.275 1.988 2.288T12 19.9"/>', 'IconShield', 24, 24)

/** Material Symbols: payments */
export const IconPayments = svg('<path fill="currentColor" d="M3 20q-.825 0-1.412-.587T1 18V7h2v11h17v2zm4-4q-.825 0-1.412-.587T5 14V6q0-.825.588-1.412T7 4h14q.825 0 1.413.588T23 6v8q0 .825-.587 1.413T21 16zm2-2q0-.825-.587-1.412T7 12v2zm10 0h2v-2q-.825 0-1.412.588T19 14m-5-1q1.25 0 2.125-.875T17 10t-.875-2.125T14 7t-2.125.875T11 10t.875 2.125T14 13M7 8q.825 0 1.413-.587T9 6H7zm14 0V6h-2q0 .825.588 1.413T21 8"/>', 'IconPayments', 24, 24)

/** Material Symbols: gesture */
export const IconGesture = svg('<path fill="currentColor" d="M13.85 21q-1.35 0-2.275-.925t-.925-2.225q0-1.9 1.538-3.438t3.837-1.912q-.075-.9-.45-1.362t-1.025-.463q-.75 0-1.625.625t-2.075 2.05q-1.95 2.325-2.862 3.025t-1.963.7q-1.275 0-2.15-.95T3 13.825t.588-2.762t1.987-3.388q.475-.65.7-1.1T6.5 5.85q0-.175-.062-.262T6.25 5.5q-.25 0-.625.313t-.875.962L3 5q.8-.975 1.625-1.487T6.25 3q1.15 0 1.95.8t.8 2q0 .725-.375 1.6t-1.25 2.1q-.95 1.35-1.412 2.375t-.463 1.8q0 .425.138.663t.387.237t.438-.137t.687-.663q.325-.35.775-.862t1.1-1.263q1.575-1.875 2.85-2.675t2.675-.8q1.675 0 2.75 1.125t1.225 3.075H21v2.5h-2.475q-.2 2.8-1.462 4.462T13.85 21m.05-2.5q.8 0 1.35-.913T16 15.05q-1.15.275-2 1.088t-.85 1.612q0 .35.2.55t.55.2"/>', 'IconGesture', 24, 24)

/** Material Symbols: landscape */
export const IconTerrain = svg('<path fill="currentColor" d="m1 18l6-8l4.5 6h2.525l-3.775-5L14 6l9 12z"/>', 'IconTerrain', 24, 24)

/** Material Symbols: expand-more */
export const IconExpandMore = svg('<path fill="currentColor" d="m12 15.375l-6-6l1.4-1.4l4.6 4.6l4.6-4.6l1.4 1.4z"/>', 'IconExpandMore', 24, 24)
