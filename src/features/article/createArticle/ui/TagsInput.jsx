import PropTypes from 'prop-types'

import { ModifyButton } from '@shared/ui/button/ModifyButton'
import { Input } from '@shared/ui/input'
import styles from '@shared/styles/ArticleForm.module.scss'

export const TagsInput = ({ register, errors = {}, resetField, unregister, tagsData = [], setTagsData }) => {
  const handleClickDeleteTag = (id) => {
    resetField(`tag-${id}`)
    unregister(`tag-${id}`)
    const updatedTags = tagsData.filter((el) => el.id !== id)
    setTagsData(updatedTags)
  }
  const handleClickAddTag = () => {
    const id = Math.random().toString(36).slice(2, 11)
    const newTag = { value: '', id }
    setTagsData([...tagsData, newTag])
  }
  const validation = {
    tags: {
      required: 'Tags can not be empty',
    },
  }

  return (
    <ul className={styles['form-tags']}>
      Tags
      {tagsData.map((el, index) => {
        return (
          <li className={styles['form-tag']} key={el.id}>
            <Input
              type="text"
              id={el.id}
              placeholder="Tag"
              classNames={{ input: 'tags' }}
              validation={{ ...register(`tag-${el.id}`, validation.tags) }}
              error={errors.tags[`tag-${el.id}`]}
            />
            <ModifyButton buttonText="Delete" action="delete" cb={() => handleClickDeleteTag(el.id)} />
            {index === tagsData.length - 1 && tagsData.length < 5 && (
              <ModifyButton buttonText="Add Tag" action="add" cb={handleClickAddTag} />
            )}
          </li>
        )
      })}
      {!tagsData.length && <ModifyButton buttonText="Add Tag" action="add" cb={handleClickAddTag} />}
    </ul>
  )
}

TagsInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  resetField: PropTypes.func,
  unregister: PropTypes.func,
  tagsData: PropTypes.array,
  setTagsData: PropTypes.func,
}
