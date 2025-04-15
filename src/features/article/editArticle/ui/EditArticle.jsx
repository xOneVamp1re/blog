import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

import { Input } from '@shared/ui/input'
import { Textarea } from '@shared/ui/textarea'
import { SubmitButton } from '@shared/ui/button/SubmitButton'
import { useGetArticleQuery } from '@entities/Article'
import styles from '@shared/styles/ArticleForm.module.scss'

import { formFields } from '../const/formFields'
import { useEditArticleMutation } from '../api/editArticleApi'

import { TagsInput } from './TagsInput'

export const EditArticle = () => {
  const { slug } = useParams() || {}
  const navigate = useNavigate()
  const { data = {} } = useGetArticleQuery(slug)

  const { title, description, body, tagList = [] } = data?.article || {}
  const [tagsData, setTagsData] = useState(() => {
    return tagList || []
  })

  const { register, handleSubmit, formState, resetField, unregister, reset } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    if (!data.article?.author) return navigate('/')
    const tagsWithId = tagList.map((el) => ({ value: el, id: Math.random().toString(36).slice(2, 11) }))
    setTagsData(tagsWithId)
    reset({
      title,
      description,
      body,
      ...tagsWithId.reduce((acc, value) => {
        const el = `tag-${value.id}`
        acc[el] = value.value
        return acc
      }, {}),
    })
  }, [reset, data])

  const [editArticle] = useEditArticleMutation()

  const onSubmit = async ({ title, description, body, ...rest }) => {
    const tagsField = Object.values(rest)
    const article = {
      title,
      description,
      body,
      tagList: tagsField,
    }
    await editArticle({ slug, data: { article } })
    navigate(`/article/${slug}`)
  }

  const validation = {
    title: {
      required: 'Title is required',
      minLength: {
        value: 3,
        message: 'Title must be at least 3 characters long',
      },
      pattern: {},
    },
    description: {
      required: 'Short description is required',
    },
    body: {
      required: 'Text is required',
    },
  }

  const errors = {
    title: formState.errors['title']?.message,
    description: formState.errors['description']?.message,
    body: formState.errors['body']?.message,
    tags: tagsData.reduce((acc, value) => {
      acc[`tag-${value.id}`] = formState.errors[`tag-${value.id}`]?.message
      return acc
    }, {}),
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className={styles['form-fieldset']}>
        <legend className={styles['form-legend']}>Edit article</legend>

        {formFields.map((field) => {
          return field.type === 'textarea' ? (
            <Textarea
              key={field.id}
              type={field.type}
              label={field.label}
              htmlFor={field.htmlFor}
              id={field.id}
              placeholder={field.placeholder}
              validation={{ ...register(field.id, validation[field.id]) }}
              error={errors[field.id]}
            />
          ) : (
            <Input
              key={field.id}
              type={field.type}
              label={field.label}
              htmlFor={field.htmlFor}
              id={field.id}
              placeholder={field.placeholder}
              validation={{ ...register(field.id, validation[field.id]) }}
              error={errors[field.id]}
            />
          )
        })}
        <TagsInput
          register={register}
          errors={errors}
          resetField={resetField}
          unregister={unregister}
          setTagsData={setTagsData}
          tagsData={tagsData}
        />
      </fieldset>
      <SubmitButton className="send" label="Send" type="submit" disabled={Object.keys(formState.errors).length > 0} />
    </form>
  )
}
