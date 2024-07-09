import { Collapse, Ripple, initTWE } from "tw-elements";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

function Sidebar({ can }) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        initTWE({Collapse, Ripple})
    }, []);

    const [accessCollapse] = useState(
        route().current('users.*') ||
        route().current('permissions.*') ||
        route().current('rules.*') ||
        route().current('groups.*') ||
        route().current('activities.*')
    );

    const [faqCollapse] = useState(
        route().current('faqs.*') ||
        route().current('tags.*')
    );

    const [chevronAccess, setChevronAccess] = useState(accessCollapse);
    const [chevronFaq, setChevronFaq] = useState(faqCollapse);

    const toggleChevronAccess = () => {
        setChevronAccess(!chevronAccess);
    }

    const toggleChevronFaq = () => {
        setChevronFaq(!chevronFaq);
    }

    useEffect(() => {
        setWidth(window.innerWidth);
    }, [window.innerWidth]);

    return (
        <>
            <nav id="sidebar" className={"!visible mr-2 p-2 " + (width >= 1024? '': 'hidden')} data-twe-collapse-item data-twe-collapse-horizontal>
                <div className="flex flex-col w-48 gap-3 md:w-64">
                    <Link
                        href={route('admin')}
                        className={((route().current('admin'))? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-2 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-5" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                        </svg>
                        Principal
                    </Link>

                    {(can.users_viewAny || can.permissions_viewAny || can.rules_viewAny || can.groups_viewAny || can.activities_viewAny) && <>
                        <button
                            className={
                                (
                                    accessCollapse
                                    ? 'bg-gray-50 shadow-md '
                                    : ''
                                ) + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex items-center gap-4 focus:ring-0`}
                            type="button"

                            data-twe-collapse-init
                            data-twe-target="#accessCollapse"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            aria-controls="accessCollapse"
                            aria-expanded="false"
                            onClick={toggleChevronAccess}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                            </svg>
                            Acesso
                            <span className={"flex-1 flex justify-end "}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className={"h-5 w-5 transition " + (!chevronAccess? ' -rotate-90': '')}
                                    viewBox="0 0 16 16"
                                >
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </span>
                        </button>
                        <div
                            className={'flex flex-col gap-1 p-2 transition bg-neutral-200 rounded-md !visible ' + (chevronAccess? '': 'hidden')}
                            data-twe-collapse-item
                            id="accessCollapse"
                        >
                            {can.users_viewAny && <Link
                                href={route('users.index', {term: '', page: 1})}
                                className={(route().current('users.*')? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                </svg>
                                Usuários
                            </Link>}
                            {can.groups_viewAny && <Link
                                href={route('groups.index', {term: '', page: 1})}
                                className={(route().current('groups.*')? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
                                </svg>
                                Páginas
                            </Link>}
                            {can.permissions_viewAny && <Link
                                href={route('permissions.index', {term: '', page: 1})}
                                className={(route().current('permissions.*')? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                                    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/>
                                </svg>
                                Permissões
                            </Link>}
                            {can.rules_viewAny && <Link
                                href={route('rules.index', {term: '', page: 1})}
                                className={(route().current('rules.*')? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"/>
                                    <path d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"/>
                                </svg>
                                Regras
                            </Link>}
                            {can.activities_viewAny && <Link
                                href={route('activities.index', {term: '', page: 1})}
                                className={(route().current('activities.*')? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
                                </svg>
                            Logs
                        </Link>}
                        </div>
                    </>}
                    {(can.faqs_viewAny || can.tags_viewAny) && <>
                        <button
                            className={
                                (
                                    faqCollapse
                                    ? 'bg-gray-50 shadow-md '
                                    : ''
                                ) + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex items-center gap-4 focus:ring-0`}
                            type="button"

                            data-twe-collapse-init
                            data-twe-target="#faqCollapse"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            aria-controls="faqCollapse"
                            aria-expanded="false"
                            onClick={toggleChevronFaq}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" className="h-5 w-5">
                                <g fill="currentColor">
                                    <path d="M8.05 9.6c.336 0 .504-.24.554-.627c.04-.534.198-.815.847-1.26c.673-.475 1.049-1.09 1.049-1.986c0-1.325-.92-2.227-2.262-2.227c-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64c.272 0 .455-.147.564-.51c.158-.592.525-.915 1.074-.915c.61 0 1.03.446 1.03 1.084c0 .563-.208.885-.822 1.325c-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/><path d="m10.273 2.513l-.921-.944l.715-.698l.622.637l.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89l.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622l.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01l-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637l-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89l-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622l-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01l.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944l-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318l-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92l-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016l.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944l1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318l.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92l.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                                    <path d="M7.001 11a1 1 0 1 1 2 0a1 1 0 0 1-2 0z"/>
                                </g>
                            </svg>
                            FAQ
                            <span className={"flex-1 flex justify-end "}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className={"h-5 w-5 transition " + (!chevronFaq? ' -rotate-90': '')}
                                    viewBox="0 0 16 16"
                                >
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </span>
                        </button>
                        <div
                            className={'flex flex-col gap-1 p-2 transition bg-neutral-200 rounded-md !visible ' + (chevronFaq? '': 'hidden')}
                            data-twe-collapse-item
                            id="faqCollapse"
                        >
                            {can.faqs_viewAny && <Link
                                href={route('faqs.index', {term: '', page: 1})}
                                className={(route().current('faqs.*')? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="h-5 w-5">
                                    <g fill="none">
                                        <path fill="currentColor" d="m10.87 21.51l.645.382l-.646-.382Zm.259-.438l-.646-.382l.646.382Zm-2.258 0l.646-.382l-.646.382Zm.26.438l-.646.382l.646-.382Zm-6.827-4.38l.693-.286l-.693.287Zm3.985 2.455l.024-.75l-.024.75Zm-1.82-.29l-.287.693l.287-.692Zm13.226-2.164l.693.287l-.693-.287Zm-3.984 2.454l-.024-.75l.024.75Zm1.82-.29l.287.693l-.287-.692ZM16.09 6.59l.392-.639l-.392.64Zm1.32 1.321l.64-.392l-.64.392ZM3.91 6.59l-.392-.64l.392.64ZM2.59 7.91l-.64-.392l.64.392Zm5.326 11.912l-.381.646l.381-.646Zm3.599 2.07l.26-.438l-1.292-.764l-.26.438l1.292.764Zm-3.29-.438l.26.438l1.291-.764l-.26-.438l-1.29.764Zm1.999-.326a.25.25 0 0 1-.224.122a.25.25 0 0 1-.224-.122l-1.29.764c.676 1.144 2.352 1.144 3.029 0l-1.291-.764ZM8.8 6.75h2.4v-1.5H8.8v1.5Zm8.45 6.05v.8h1.5v-.8h-1.5Zm-14.5.8v-.8h-1.5v.8h1.5Zm-1.5 0c0 .922 0 1.65.04 2.24c.04.596.125 1.104.322 1.578l1.385-.574c-.108-.261-.175-.587-.21-1.106c-.037-.527-.037-1.196-.037-2.138h-1.5Zm5.063 5.235c-.792-.025-1.223-.094-1.557-.232l-.574 1.385c.597.248 1.255.32 2.083.347l.048-1.5Zm-4.701-1.417a4.75 4.75 0 0 0 2.57 2.57l.574-1.385a3.25 3.25 0 0 1-1.759-1.76l-1.385.575ZM17.25 13.6c0 .942 0 1.611-.036 2.138c-.036.52-.103.845-.211 1.106l1.385.574c.197-.474.281-.982.322-1.578c.04-.59.04-1.318.04-2.24h-1.5Zm-3.515 6.735c.828-.027 1.486-.1 2.083-.347l-.574-1.385c-.335.138-.765.207-1.557.232l.048 1.5Zm3.268-3.491a3.25 3.25 0 0 1-1.76 1.759l.575 1.385a4.75 4.75 0 0 0 2.57-2.57l-1.385-.574ZM11.2 6.75c1.324 0 2.264 0 2.995.07c.72.069 1.16.199 1.503.409l.784-1.279c-.619-.38-1.315-.544-2.145-.623c-.818-.078-1.842-.077-3.137-.077v1.5Zm7.55 6.05c0-1.295 0-2.319-.077-3.137c-.079-.83-.244-1.526-.623-2.145l-1.279.784c.21.343.34.783.409 1.503c.07.73.07 1.671.07 2.995h1.5Zm-3.052-5.571a3.25 3.25 0 0 1 1.073 1.073l1.279-.784a4.75 4.75 0 0 0-1.568-1.568l-.784 1.279ZM8.8 5.25c-1.295 0-2.319 0-3.137.077c-.83.079-1.526.244-2.145.623l.784 1.279c.343-.21.783-.34 1.503-.409c.73-.07 1.671-.07 2.995-.07v-1.5ZM2.75 12.8c0-1.324 0-2.264.07-2.995c.069-.72.199-1.16.409-1.503L1.95 7.518c-.38.619-.544 1.315-.623 2.145c-.078.818-.077 1.842-.077 3.137h1.5Zm.768-6.85A4.75 4.75 0 0 0 1.95 7.518l1.279.784a3.25 3.25 0 0 1 1.073-1.073L3.518 5.95Zm5.999 14.74c-.201-.34-.377-.638-.548-.874a2.23 2.23 0 0 0-.67-.64l-.764 1.292c.046.027.11.077.22.23c.12.165.256.393.47.756l1.292-.764Zm-3.252-.355c.446.014.73.024.947.05c.204.025.281.058.323.083l.763-1.291c-.29-.171-.594-.243-.905-.28c-.298-.037-.661-.048-1.08-.062l-.048 1.5Zm5.51 1.119c.214-.363.35-.591.47-.756c.11-.153.174-.203.22-.23l-.763-1.291a2.23 2.23 0 0 0-.67.64c-.172.235-.348.534-.549.873l1.291.764Zm1.912-2.619c-.419.014-.782.025-1.08.061c-.31.038-.616.11-.905.28l.763 1.292c.042-.025.119-.058.323-.083c.216-.026.501-.036.947-.05l-.048-1.5Z"/><path fill="currentColor" d="m21.715 12.435l.692.287l-.692-.287Zm-2.03 2.03l.287.693l-.287-.693Zm.524-11.912l-.392.64l.392-.64Zm1.238 1.238l.64-.392l-.64.392ZM8.791 2.553l-.392-.64l.392.64ZM7.553 3.79l-.64-.392l.64.392Zm5.822-1.041h2.25v-1.5h-2.25v1.5Zm7.875 5.625v.75h1.5v-.75h-1.5Zm0 .75c0 .884 0 1.51-.034 2c-.033.486-.096.785-.194 1.023l1.385.574c.187-.451.267-.933.305-1.494c.038-.554.038-1.24.038-2.103h-1.5Zm-.228 3.023a3 3 0 0 1-1.624 1.624l.574 1.386a4.5 4.5 0 0 0 2.435-2.436l-1.385-.574ZM15.625 2.75c1.242 0 2.12 0 2.804.066c.671.064 1.075.184 1.388.376l.784-1.279c-.588-.36-1.249-.516-2.03-.59c-.77-.074-1.733-.073-2.946-.073v1.5Zm7.125 5.625c0-1.213 0-2.175-.073-2.946c-.074-.781-.23-1.442-.59-2.03l-1.28.784c.193.313.313.717.377 1.388c.065.683.066 1.562.066 2.804h1.5Zm-2.933-5.183a3 3 0 0 1 .99.99l1.28-.783A4.5 4.5 0 0 0 20.6 1.913l-.784 1.28ZM13.375 1.25c-1.213 0-2.175 0-2.946.072c-.781.075-1.442.23-2.03.591l.783 1.28c.314-.193.718-.313 1.39-.377c.682-.065 1.56-.066 2.803-.066v-1.5Zm-4.976.663A4.5 4.5 0 0 0 6.913 3.4l1.279.784a3 3 0 0 1 .99-.99L8.4 1.912ZM7.782 6.04c.05-.96.175-1.473.41-1.856L6.913 3.4c-.437.713-.576 1.538-.629 2.562l1.498.078Zm10.243 9.446c.767-.026 1.384-.094 1.947-.327l-.574-1.386c-.302.125-.694.19-1.423.214l.05 1.499Z"/>
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.51 13h.008M10 13h.009m3.482 0h.009"/>
                                    </g>
                                </svg>
                                Perguntas e respostas
                            </Link>}
                            {can.tags_viewAny && <Link
                                href={route('tags.index', {term: '', page: 1})}
                                className={(route().current('tags.*')? 'bg-gray-50 shadow-md ': '') + `text-gray-600 p-3 rounded-lg hover:bg-white hover:shadow-md transition flex gap-4`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" className="h-5 w-5">
                                    <g fill="currentColor">
                                        <path d="M6 4.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0z"/>
                                        <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586l7 7L13.586 9l-7-7H2v4.586z"/>
                                    </g>
                                </svg>
                                Tags
                            </Link>}
                        </div>
                    </>}
                </div>
            </nav>
        </>
    )
}

export default Sidebar;
