import { Disclosure, Transition } from '@headlessui/react'
import { useDetailPost } from 'hooks/useDetailPost'

export const DisclosureText = () => {
  const { detailPost } = useDetailPost()
  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Disclosure.Panel className="text-gray-500">
        {detailPost?.body}
      </Disclosure.Panel>
    </Transition>
  )
}
