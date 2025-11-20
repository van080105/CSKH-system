import { useState, useRef, useEffect } from 'react'

export default function useFAQ() {
  const [faqs, setFaqs] = useState([])
  const [openIndexes, setOpenIndexes] = useState([])
  const [modalType, setModalType] = useState(null)
  const [currentFAQIndex, setCurrentFAQIndex] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const [form, setForm] = useState({ category: '', question: '', answer: '' })
  const [error, setError] = useState('')

  const questionRef = useRef(null)
  const answerRef = useRef(null)

  const fetchFAQs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/faq', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      return data.map(faq => ({
        id: faq.ID,
        category: faq.Category,
        question: faq.Question,
        answer: faq.Answer,
      }))
    } catch (error) {
      console.error('Error fetching FAQs:', error)
      return []
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFAQs = await fetchFAQs()
      setFaqs(fetchedFAQs)
    }
    fetchData()
  }, [])

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === '' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const openAddModal = () => {
    setForm({ category: '', question: '', answer: '' })
    setModalType('add')
  }

	const openEditModal = (index) => {
		setCurrentFAQIndex(index)
		const target = faqs[index]

		setForm({
			id: target.id,
			category: target.category,
			question: target.question,
			answer: target.answer,
		})

		setModalType('edit')
	}

  const openDeleteModal = (index) => {
    setCurrentFAQIndex(index)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setCurrentFAQIndex(null)
    setError('')
    setForm({ category: '', question: '', answer: '' })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleAdd = async () => {
    const categoryEmpty = !form.category.trim()
    const questionEmpty = !form.question.trim()
    const answerEmpty = !form.answer.trim()

    if (categoryEmpty) {
      setError('Vui lòng nhập danh mục!')
      return
    }
    if (questionEmpty) {
      questionRef.current?.focus()
      setError('Vui lòng nhập câu hỏi!')
      return
    }
    if (answerEmpty) {
      answerRef.current?.focus()
      setError('Vui lòng nhập câu trả lời!')
      return
    }

    const duplicateQuestion = faqs.some(
      (faq) =>
        faq.question.trim().toLowerCase() === form.question.trim().toLowerCase()
    )
    const duplicateAnswer = faqs.some(
      (faq) =>
        faq.answer.trim().toLowerCase() === form.answer.trim().toLowerCase()
    )

    if (duplicateQuestion) {
      questionRef.current?.focus()
      setError('Câu hỏi đã tồn tại!')
      return
    }
    if (duplicateAnswer) {
      answerRef.current?.focus()
      setError('Câu trả lời đã tồn tại!')
      return
    }

    try {
      const response = await fetch('http://localhost:8080/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: form.category,
          question: form.question,
          answer: form.answer,
        }),
      })

      if (response.ok) {
        const newFAQ = await response.json()
        setFaqs([
          ...faqs,
          {
            id: newFAQ.newID,
            category: newFAQ.Category || form.category,
            question: newFAQ.Question || form.question,
            answer: newFAQ.Answer || form.answer,
          },
        ])

        closeModal()
      } else {
        const err = await response.json()
        setError(err.error || 'Không thể thêm FAQ!')
      }
    } catch (error) {
      console.error('Error adding FAQ:', error)
      setError('Lỗi khi kết nối đến máy chủ!')
    }
  }

  const handleEdit = async () => {
    const questionEmpty = !form.question.trim()
    const answerEmpty = !form.answer.trim()

    if (questionEmpty) {
      questionRef.current?.focus()
      setError('Vui lồng nhập câu hỏi!')
      return
    }
    if (answerEmpty) {
      answerRef.current?.focus()
      setError('Vui lồng nhập câu trả lời!')
      return
    }

    const duplicateQuestion = faqs.some(
      (faq, i) =>
        i !== currentFAQIndex &&
        faq.question.trim().toLowerCase() === form.question.trim().toLowerCase()
    )
    const duplicateAnswer = faqs.some(
      (faq, i) =>
        i !== currentFAQIndex &&
        faq.answer.trim().toLowerCase() === form.answer.trim().toLowerCase()
    )

    if (duplicateQuestion) {
      questionRef.current?.focus()
      setError('Câu hỏi đã tồn tại!')
      return
    }
    if (duplicateAnswer) {
      answerRef.current?.focus()
      setError('Câu trả lời đã tồn tại!')
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/faq/${form.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category: form.category,
            question: form.question,
            answer: form.answer,
          }),
        }
      )

      if (response.ok) {
        const updated = [...faqs]
        updated[currentFAQIndex] = form
        setFaqs(updated)
        closeModal()
      } else {
        const err = await response.json()
        setError(err.error || 'Không thể cập nhật FAQ!')
      }
    } catch (error) {
      console.error('Error updating FAQ:', error)
      setError('Lỗi khi kết nối đến máy chủ!')
    }
  }

  const handleDelete = async () => {
    if (currentFAQIndex === null) return

    const faqToDelete = faqs[currentFAQIndex]
    const idToDelete = faqToDelete?.id

    if (!idToDelete) return

    try {
      await fetch(`http://localhost:8080/api/faq/${idToDelete}`, {
        method: 'DELETE',
      })

      setFaqs((prev) =>
        prev.filter((_, idx) => idx !== currentFAQIndex)
      )

      closeModal()
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    }
  }

  return {
    faqs,
    modalType,
    form,
    error,
    questionRef,
    answerRef,
    openIndexes,
    setOpenIndexes,
    filteredFaqs,
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
  }
}
