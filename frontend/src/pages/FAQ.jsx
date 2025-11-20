import { useTranslation } from 'react-i18next'
import useFAQ from '../hooks/useFAQ'
import highlightText from '../utils/hightlightText'

import SearchBar from '../components/FAQ/FAQSearchbar'
import CategoryGroup from '../components/FAQ/FAQCategoryGroup'
import FAQItem from '../components/FAQ/FAQItem'

import ModalAdd from '../components/FAQ/FAQModal/AddModal'
import ModalEdit from '../components/FAQ/FAQModal/EditModal'
import ModalDelete from '../components/FAQ/FAQModal/DeleteModal'

export default function FAQ({ showModify = true }) {
  const { t } = useTranslation()

  const {
    faqs,
    filteredFaqs,
    modalType,
    form,
    error,
    questionRef,
    answerRef,

    openIndexes,
    setOpenIndexes,

    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,

    openAddModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    handleChange,
    handleAdd,
    handleEdit,
    handleDelete,
  } = useFAQ()

  return (
    <div className="relative max-w-6xl mx-auto p-6">

      {/* Search + Filter + Add */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={[...new Set(faqs.map((f) => f.category))]}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        t={t}
        showModify={showModify}
        openAddModal={openAddModal}
      />

      <div className="space-y-5">
        {Object.entries(
          filteredFaqs.reduce((acc, faq) => {
            if (!acc[faq.category]) acc[faq.category] = []
            acc[faq.category].push(faq)
            return acc
          }, {})
        ).map(([category, items], catIndex) => {
          const categoryKey = `cat-${catIndex}`
          const isCategoryOpen = openIndexes.includes(categoryKey)

          return (
            <CategoryGroup
              key={category}
              category={category}
              items={items}
              isOpen={isCategoryOpen}
              toggleCategory={() =>
                setOpenIndexes((prev) =>
                  prev.includes(categoryKey)
                    ? prev.filter((i) => i !== categoryKey)
                    : [...prev, categoryKey]
                )
              }
              renderItem={(faq) => {
                const faqKey = `faq-${faq.id}`
                const isFAQOpen = openIndexes.includes(faqKey)
                const globalIndex = faqs.findIndex((f) => f.id === faq.id)

                return (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isOpen={isFAQOpen}
                    toggle={() =>
                      setOpenIndexes((prev) =>
                        prev.includes(faqKey)
                          ? prev.filter((i) => i !== faqKey)
                          : [...prev, faqKey]
                      )
                    }
                    highlightText={highlightText}
                    searchQuery={searchQuery}
                    showModify={showModify}
                    openEdit={openEditModal}
                    openDelete={openDeleteModal}
                    globalIndex={globalIndex}
                  />
                )
              }}
            />
          )
        })}
      </div>

      {/* MODALS */}
      {showModify && modalType === 'add' && (
        <ModalAdd
          form={form}
          error={error}
          t={t}
          handleAdd={handleAdd}
          handleChange={handleChange}
          closeModal={closeModal}
          questionRef={questionRef}
          answerRef={answerRef}
        />
      )}

      {showModify && modalType === 'edit' && (
        <ModalEdit
          form={form}
          error={error}
          t={t}
          handleEdit={handleEdit}
          handleChange={handleChange}
          closeModal={closeModal}
          questionRef={questionRef}
          answerRef={answerRef}
        />
      )}

      {showModify && modalType === 'delete' && (
        <ModalDelete
          t={t}
          handleDelete={handleDelete}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}
